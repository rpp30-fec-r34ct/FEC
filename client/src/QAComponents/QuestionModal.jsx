import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import ReactDOM from 'react-dom'
import axios from 'axios'

const QuestionModal = (props) => {
  const modalRef = useRef()
  const [showQuestionModal, setShowQuestionModal] = useState(true)
  const productID = useParams().productId

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape') {
        setShowQuestionModal(false)
      }
    },
    [setShowQuestionModal, showQuestionModal]
  )

  const submitNewQuestion = (e) => {
    e.preventDefault()
    if (!e.target[0].value || !e.target[1].value || !e.target[2].value) {
      return alert('Your question could not be processed. You must enter ALL of the following: \nQuestion, \nYour Name, and \nYour Email Address')
    }
    const body = e.target[0].value
    const name = e.target[1].value
    const email = e.target[2].value
    const id = productID
    axios.post('/qa/newquestion?' + 'body=' + body + '&name=' + name + '&email=' + email + '&product_id=' + id, {
      body: body,
      name: name,
      email: email,
      id: id
    })
    .then(data => showQuestionModal ? setShowQuestionModal(false) : null)
    .catch(err => console.log(err))
  }

  useEffect(
    () => {
      if (props.showQuestionModal) {
        setShowQuestionModal(prev => !prev)
      }
      document.addEventListener('keydown', keyPress)
      return () => document.removeEventListener('keydown', keyPress)
    },
    [props.showQuestionModal]
  )

  return (
    <>
      {showQuestionModal ? (
          <div id="question-modal">
          <div className='add-question-form' id={props.product_id}>
            <h1>Product: {document.getElementsByClassName('card-name')[0] ? document.getElementsByClassName('card-name')[0].innerHTML : 'Product'}</h1>
            <form onSubmit={submitNewQuestion}>
              <input name='question' type='text' placeholder='Your Question' />
              <input name='nickname' type='text' placeholder='Your Nickname' />
              <input name='email' type='text' placeholder='Your Email' />
              <button type='submit'>Submit</button>
            </form>
          </div>
          </div>

        ) : null}
    </>
  )
}

export default QuestionModal
