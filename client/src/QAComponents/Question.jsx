import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './QA.css'
import Answer from './Answer.jsx'
import AnswerList from './AnswerList.jsx'
import AnswerModal from './AnswerModal.jsx'

const Question = (props) => {
  // const [question, setQuestion] = useState(['test', 'testing', 'TESTING'])
  // const [answers, setAnswers] = useState()
  // const [firstRender, setFirstRender] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const productID = useParams().productId
  const [helpful, setHelpful] = useState(true)

  // SERVER REQUESTS
  const initialize = (callback) => {
    axios.get('/qa/questions' + '?product_id=' + productID)
      .then((data) => {
        callback(null, data.data.results)
      })
      .catch((err) => {
        console.error('error while getting product data from server')
      })
  }

  const addAnswer = (e) => {
    openModal()
  }

  // SHOW MODAL
  const openModal = () => {
    setShowModal(!showModal)
  }

  const addHelpfulQuestion = (e) => {
    axios.put('/qa/helpfulquestion?question_id=' + e.target.parentNode.id, {
      question_id: e.target.id
    })
      .then(data => console.log(data))
      .catch(err => { console.error(err) })
  }

  // useEffect(() => {
  //   initialize((err, data) => {
  //     setQuestion(firstRender ? data.slice(0, 2) : data)
  //   })
  // }, [])

  return (
    <>
      <div id={props.question_id} className='question-body'>
        <div>Q: {props.question_body}</div><div>Helpful?</div><div className='helpful-question' onClick={addHelpfulQuestion}>Yes</div> <div>({props.question_helpfulness || 0})</div>
        <div id='add-answer' onClick={addAnswer}>ADD ANSWER
        </div>
      </div>
      {console.log(props.question_id)}
      {props.question_id ? <AnswerList id={props.question_id}/> : null}
      <AnswerModal showModal={showModal} question_id={props.question_id}/>
    </>
  )
}

export default Question
