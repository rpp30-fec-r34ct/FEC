import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './QA.css'
// import Answer from './Answer.jsx'
import AnswerList from './AnswerList.jsx'
import AnswerModal from './AnswerModal.jsx'

const Question = (props) => {
  // const [question, setQuestion] = useState(['test', 'testing', 'TESTING'])
  // const [answers, setAnswers] = useState()
  // const [firstRender, setFirstRender] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [qHelpfulness, setQHelpfulness] = useState(props.question_helpfulness)
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
    e.preventDefault()
    openModal()
  }

  // SHOW MODAL
  const openModal = (e) => {
    e.preventDefault()
    setShowModal(!showModal)
  }

  const addHelpfulQuestion = (e) => {
    e.preventDefault()
    axios.put('/qa/helpfulquestion?question_id=' + e.target.parentNode.id, {
      question_id: e.target.id
    })
      .then(data => setQHelpfulness(qHelpfulness++))
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
        <div>Q: {props.question_body}</div><div>Helpful?</div><a href="" className='helpful-question' onClick={addHelpfulQuestion}>Yes</a> <div>({qHelpfulness || 0})</div>
        <a href="" id='add-answer' onClick={addAnswer}>ADD ANSWER</a>
      </div>
      {props.question_id ? <AnswerList id={props.question_id}/> : null}
      <AnswerModal showModal={showModal} question_id={props.question_id}/>
    </>
  )
}

export default Question
