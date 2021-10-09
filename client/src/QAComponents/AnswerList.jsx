/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactDOM from 'react-dom'
import axios from 'axios'
import NewAnswer from './NewAnswer.jsx'

const AnswerList = (props) => {
  const [answers, setAnswers] = useState([])
  const [moreAnswers, setMoreAnswers] = useState([])
  const [helpfulAns, setHelpfulAns] = useState(0)
  const [expandCollapse, setExpandCollapse] = useState('SEE MORE ANSWERS')
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
    let queryString = '?question_id=' + question + '&page=1&count=10'
    axios.get('/qa/answers' + queryString)
      .then(data => {
        callback(null, data)
      })
      .catch(err => err)
  }

  // INITIAL RENDER
  const initialize = (questionId, callback) => {
    getAllAnswers(questionId, (err, data) => {
      if (err) {
        return err
      } else {
        callback(null, data.data)
      }
    })
  }
  // LOAD MORE ANSWERS UPON USER CLICK
  const getMoreAnswers = (e) => {
    if (e) {
      e.preventDefault()
    }
    if (expandCollapse === 'COLLAPSE ANSWERS') {
      setAnswers(moreAnswers.slice(0,2))
      return setExpandCollapse('SEE MORE ANSWERS')
    }
    if (moreAnswers.length > answers.length) {
      setAnswers(moreAnswers)
      return setExpandCollapse('COLLAPSE ANSWERS')
    }
  }

  // INITIAL RENDER INVOCATION
  useEffect(() => {
    var loadedAnswers = []
    initialize(props.id, (err, data) => {
      if (err) {
        return err
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
    if (props.updateAnswers) {
      return getMoreAnswers(null)
    }
  }, [props.id, props.updateAnswers])

  return (
    <>
      <div style={answerListStyle} id="answer-list">{answers && answers.map(answer => {
        let date, day, month, year, parse
        const answerId = 0
        if (answer.date) {
          date = new Date(answer.date);
          [day, year] = [date.getDate(), date.getFullYear()]
          month = date.toString().slice(4, 7)
        }
        if (moreAnswers.length > 2) {
          renderMoreAnswers = <div href="#" id="get-more-answers" onClick={getMoreAnswers}>{expandCollapse}</div>
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
