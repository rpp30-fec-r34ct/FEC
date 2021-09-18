import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactDOM from 'react-dom'
import axios from 'axios'

const Answer = (props) => {
  const [state, setState] = useState()
  const [answers, setAnswers] = useState([])
  const [moreAnswers, setMoreAnswers] = useState(['dummy', 'data'])
  const [moreQuestions, setMoreQuestions] = useState(['dummy', 'data'])
  const [didMount, setDidMount] = useState(false)
  let renderMoreAnswers = <div />
  // const [questionId, setQuestionId] = useState(props.question_id);

  // SERVER REQUESTS
  const getAllAnswers = (question, callback) => {
    console.log('getting all answers...', question)
    if (question === undefined) {
      return
    }
    axios.get('/qa/answers?question_id=' + question)
      .then(data => {
        console.log('all answers', data)
        callback(null, data)
      })
      .catch(err => console.log(err))
  }

  const reportAnswer = (e) => {
    const answerId = e.target.parentNode.parentNode.parentNode.id
    e.preventDefault()
    console.log('reporting answer...', answerId)
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
    e.preventDefault()
    console.log('marking answer as helpful...', answerId)
    axios.put('/qa/answers/helpful/?answer_id=' + answerId)
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  // INITIAL RENDER
  const initialize = (questionId, callback) => {
    getAllAnswers(props.question_id, (err, data) => {
      if (err) {
        console.error(err)
      } else {
        callback(null, data.data)
      }
      // setAnswers(prev => {
      //   if (data.data.length === 2) {
      //     return prev = [data.data[0], data.data[1]];
      //   } else if (data.data.length === 1) {
      //     console.log('there is only one?');
      //     return prev = [...prev, data.data[0]];
      //   }
      // });

      // setMoreAnswers(prev => {
      //   return prev = data.data;
      // });
    })
  }

  // LOAD MORE ANSWERS UPON USER CLICK
  const getMoreAnswers = (e) => {
    e.preventDefault()
    // console.log('getting the remaining answers...');
    setAnswers(prev => {
      return prev = moreAnswers
    })
  }

  // INITIAL RENDER INVOCATION
  useEffect(() => {
    initialize(props.question_id, (err, data) => {
      if (err) {
        console.error(err)
      } else {
        setAnswers(prev => {
          return prev = data.slice(0, 2)
        })
        setMoreAnswers(prev => { return prev = data })
      }
    })
  }, [props.question_id])

  return (
    <>
      {/* {console.log('these are the answers', answers)} */}
      <div>{answers.map(answer => {
        let date, day, month, year, parse
        const answerId = 0
        if (answer.date) {
          date = new Date(answer.date);
          [day, year] = [date.getDate(), date.getFullYear()]
          month = date.toString().slice(4, 7)
          // console.log('date',  day, month, year);
        }
        if (moreAnswers.length > 2) {
          renderMoreAnswers = <div onClick={getMoreAnswers}>LOAD MORE ANSWERS</div>
        }
        return (
          <div className='answer-body' id={answer.answer_id}>
            <div>A: {answer.body}</div>
            <div className='answer-panel'><div>by {answer.answerer_name}, {month} {day}, {year} | <div>Helpful?</div><div className='helpful-answer' onClick={helpfulAnswer}>Yes </div><div>({answer.helpfulness})</div> | <div className='report-answer' onClick={reportAnswer}>Report</div></div></div>
            {/* <div>{didMount ? answer.photos : null}</div> */}
          </div>
        )
      })}
      </div>
      <div>{renderMoreAnswers}</div>
    </>
  )
}

export default Answer
