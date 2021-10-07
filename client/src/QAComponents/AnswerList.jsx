/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactDOM from 'react-dom'
import axios from 'axios'
import NewAnswer from './NewAnswer.jsx'

const AnswerList = (props) => {
  const [answers, setAnswers] = useState([])
  const [moreAnswers, setMoreAnswers] = useState(['dummy', 'data'])
  const [helpfulAns, setHelpfulAns] = useState(0)
  let renderMoreAnswers = <div />

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

  // LOAD MORE ANSWERS UPON USER CLICK
  const getMoreAnswers = async (e) => {
    e.preventDefault()
    await setAnswers(moreAnswers)
    setMoreAnswers(0)
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
      <div>{answers && answers.map(answer => {
        let date, day, month, year, parse
        const answerId = 0
        if (answer.date) {
          date = new Date(answer.date);
          [day, year] = [date.getDate(), date.getFullYear()]
          month = date.toString().slice(4, 7)
        }
        if (moreAnswers.length > 2) {
          renderMoreAnswers = <div className="answer-body"><a href="#" onClick={getMoreAnswers}>See More Answers</a></div>
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
      {moreAnswers && moreAnswers.length > 0 ? <div>{renderMoreAnswers}</div> : null}
    </>
  )
}

export default AnswerList
