import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactDOM from 'react-dom'
import axios from 'axios'
import NewAnswer from './NewAnswer.jsx'

const AnswerList = (props) => {
  const [state, setState] = useState()
  const [answers, setAnswers] = useState(['test1, test2'])
  const [moreAnswers, setMoreAnswers] = useState(['dummy', 'data'])
  const [moreQuestions, setMoreQuestions] = useState(['dummy', 'data'])
  const [didMount, setDidMount] = useState(false)
  const [helpfulAns, setHelpfulAns] = useState(0)
  let renderMoreAnswers = <div />
  // const [questionId, setQuestionId] = useState(props.question_id);

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

  const reportAnswer = (e) => {
    const answerId = e.target.parentNode.parentNode.parentNode.id
    e.preventDefault()
    axios.put('/qa/answers/report/?answer_id=' + answerId)
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  const helpfulAnswer = (e) => {
    const answerId = e.target.parentNode.parentNode.parentNode.id
    console.log('clicked')
    e.preventDefault()
    axios.put('/qa/answers/helpful/?answer_id=' + answerId)
      .then(data => {
        console.log(helpfulAns)
        return setHelpfulAns(!helpfulAns)
      })
      .catch(err => {
        console.error(err)
      })
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
  const getMoreAnswers = (e) => {
    e.preventDefault()
    setAnswers(moreAnswers)
    setMoreAnswers(0)
  }

  // INITIAL RENDER INVOCATION
  useEffect(() => {
    initialize(props.id, (err, data) => {
      if (err) {
        console.error(err)
      } else {
        setAnswers(data.slice(0, 2))
        setMoreAnswers(data)
      }
    })
  }, [props.id])

  return (
    <>
      <div>{answers ? answers.map(answer => {
        let date, day, month, year, parse
        const answerId = 0
        if (answer.date) {
          date = new Date(answer.date);
          [day, year] = [date.getDate(), date.getFullYear()]
          month = date.toString().slice(4, 7)
        }
        if (moreAnswers.length > 2) {
          renderMoreAnswers = <a href="#" onClick={getMoreAnswers}>LOAD MORE ANSWERS</a>
        }
        return (
          <NewAnswer
          id={answer.answer_id}
          key={answer.answer_id + 1}
          body={answer.body}
          name={answer.answerer_name}
          month={month}
          day={day}
          year={year}
          helpfulness={answer.helpfulness}
          />
          // <div className='answer-body' id={answer.answer_id} key={answer.answer_id + 1}>
          //   <div>A: {answer.body}</div>
          //   <div className='answer-panel'><div>by {answer.answerer_name}, {month} {day}, {year} | <div>Helpful?</div><div className='helpful-answer' onClick={helpfulAnswer}>Yes</div><div>({answer.helpfulness})</div> | <div className='report-answer' onClick={reportAnswer}>Report</div></div></div>
          // </div>
        )
      }) : null}
      </div>
      {moreAnswers && moreAnswers.length > 0 ? <div>{renderMoreAnswers}</div> : null}
    </>
  )
}

export default AnswerList
