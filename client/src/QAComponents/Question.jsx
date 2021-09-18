import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './QA.css'
import Answer from './Answer.jsx'
import AnswerModal from './AnswerModal.jsx'

const Question = (props) => {
  const [question, setQuestion] = useState(['test', 'testing', 'TESTING'])
  const [answers, setAnswers] = useState()
  const [firstRender, setFirstRender] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const productID = useParams().productId

  // SERVER REQUESTS
  const initialize = (callback) => {
    // e.preventDefault();
    axios.get('/qa/questions' + '?product_id=' + productID)
      .then((data) => {
      // console.log('questions received from server for product', data.data.results);
        callback(null, data.data.results)
      })
      .catch((err) => {
        console.error('error while getting product data from server')
      })
  }

  const addAnswer = (e) => {
    console.log('adding answer...', e.target.parentNode.id)
    openModal()
  }

  // SHOW MODAL
  const openModal = () => {
    setShowModal(prev => !prev)
  }

  const addHelpfulQuestion = (e) => {
    console.log('this question was helpful', e.target.parentNode.id)
    axios.put('/qa/helpfulquestion?question_id=' + e.target.parentNode.id, {
      question_id: e.target.id
    })
      .then(data => console.log(data))
      .catch(err => { console.error(err) })
  }

  useEffect(() => {
    initialize((err, data) => {
      setQuestion((prev) => {
        // console.log('data?', data, 'prev?', prev);
        if (firstRender) {
          return prev = data.slice(0, 2)
        } else {
          return prev = data
        }
        // console.log('prev?', prev);
      })
    })
  }, [])

  // let questionId = 0;
  // if (question) {
  //   questionId = question.question_id
  // }
  // console.log(props);
  return (
    <>
      <div id={props.question_id} className='question-body'>
        <div>Q: {props.question_body}</div><div>Helpful?</div><div className='helpful-question' onClick={addHelpfulQuestion}>Yes</div> <div>({props.question_helpfulness || 0})</div>
        <div id='add-answer' onClick={addAnswer}>ADD ANSWER
        </div>
      </div>
      <Answer question_id={props.question_id} />
      <AnswerModal showModal={showModal} question_id={props.question_id} />
      {/* </div> */}
      {/* {console.log('working', question)} */}
      {/* <div className="question-block">{question.map(question => {
        return (
        )
      })}</div> */}
    </>
  )
}

export default Question
