import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactDOM from 'react-dom'
import axios from 'axios'
import NewAnswer from './NewAnswer.jsx'

const AnswerList = (props) => {
  const [answers, setAnswers] = useState([])
  const [moreAnswers, setMoreAnswers] = useState([])
  const [helpfulAns, setHelpfulAns] = useState(0)
  const [expandCollapse, setExpandCollapse] = useState('See More Answers')
  const [moreClicked, setMoreClicked] = useState(false)
  const [shouldHandleScroll, setShouldHandleScroll] = useState(false)
  let renderMoreAnswers
  const answerListStyle = {
    maxHeight: '250px',
    overflow: 'scroll',
  }

  // SERVER REQUESTS
  const getAllAnswers = (question, callback) => {
    if (question === undefined) {
      return
    }
    axios.get('/qa/answers?question_id=' + question)
      .then(data => {
        callback(null, data)
      })
      .catch(err => console.log(err))
  }

  // INITIAL RENDER
  const initialize = (questionId, callback) => {
    getAllAnswers(questionId, (err, data) => {
      if (err) {
        console.error(err)
      } else {
        callback(null, data.data)
      }
    })
  }

  const collapseAnswers = (e) => {
    e.preventDefault()
    // setShouldHandleScroll(false)
    // if (moreClicked) {
    //   setAnswers(moreAnswers.slice(0, 2))
    //   return new Promise((resolve, reject)=>{
    //     resolve()})
    //     .then(data => {
    //       if (e.target.scrollTop === 0) {
    //       setAnswers(moreAnswers.slice(0, 2))
    //       setTimeout(()=>{
    //         setExpandCollapse('See More Answers')
            return setAnswers(moreAnswers.slice(0, 2))
    //       }, 150)
    //     }})
    // }
  }
  // LOAD MORE ANSWERS UPON USER CLICK
  const getMoreAnswers = (e) => {
    // setMoreClicked(true)
    // setShouldHandleScroll(true)
    e.preventDefault()
    if (expandCollapse === 'Collapse Answers') {
      setExpandCollapse('See More Answers')
      setAnswers(prev => prev.slice(0,2))
    } else {
      setAnswers(moreAnswers)
      setExpandCollapse('Collapse Answers')
    }
    // return new Promise(async (resolve, reject)=>{
    //   resolve()})
    // .then(data => {
    //   if (moreAnswers.length > answers.length) {
    //     setAnswers(moreAnswers.slice(0, answers.length + 2))
    //     return answers.length + 2
    //   }})
    // .then(data => {
    //   console.log('answers', data)
    //   if (moreAnswers.length <= data) {
    //     setExpandCollapse('Collapse Answers')
    //   }})
  }

  const handleScroll = (e) => {
    if (shouldHandleScroll) {
      const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
      if (bottom) {
        getMoreAnswers(e)
      }
    }
  }

  // INITIAL RENDER INVOCATION
  useEffect(() => {
    var loadedAnswers = []
    initialize(props.id, (err, data) => {
      if (err) {
        console.error(err)
      } else {
        setAnswers(prev => {
          data.map(datum => {
            if (datum.answerer_name.toLowerCase() === 'seller') {
              loadedAnswers.unshift(datum)
            } else {
              loadedAnswers.push(datum)
            }
          }).sort((answer1, answer2) => answer2.helpfulness - answer1.helpfulness)
          return loadedAnswers.slice(0, 2)
        })
        setMoreAnswers(loadedAnswers)
      }
    })
  }, [props.id])

  return (
    <>
      <div style={answerListStyle} id="answer-list" onScroll={handleScroll}>{answers && answers.map(answer => {
        let date, day, month, year, parse
        const answerId = 0
        if (answer.date) {
          date = new Date(answer.date);
          [day, year] = [date.getDate(), date.getFullYear()]
          month = date.toString().slice(4, 7)
        }
        if (moreAnswers.length > 2) {
          renderMoreAnswers = <a href="#" onClick={getMoreAnswers}>{expandCollapse}</a>
        }
        return (
          <NewAnswer
          id={answer.answer_id}
          key={answer.answer_id + 1}
          body={answer.body}
          name={answer.answerer_name}
          photos={answer.photos}
          month={month}
          day={day}
          year={year}
          helpfulness={answer.helpfulness}
          />
        )
      })}
      </div>
      {moreAnswers.length > 0 ? renderMoreAnswers : null}
    </>
  )
}

export default AnswerList
