import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import ReactDOM from 'react-dom'
import axios from 'axios'

const QuestionModal = (props) => {
  const modalRef = useRef()
  const [showQuestionModal, setShowQuestionModal] = useState(props.showQuestionModal)
  const productID = useParams().productId
  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowQuestionModal(false)
    }
  }

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showQuestionModal) {
        setShowQuestionModal(false)
        console.log('Escape key pressed')
      }
    },
    [setShowQuestionModal, showQuestionModal]
  )

  const submitNewQuestion = (e) => {
    e.preventDefault()
    console.log(e);
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
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress)
      return () => document.removeEventListener('keydown', keyPress)
    },
    [keyPress]
  )

  return (
    <div id="question-modal">
      {props.showQuestionModal ? (
        <div className='add-question-form' id={props.product_id}>
          <h1>Product</h1>
          <form onSubmit={submitNewQuestion}>
            <input name='question' type='text' placeholder='Your Question' />
            <input name='nickname' type='text' placeholder='Your Nickname' />
            <input name='email' type='text' placeholder='Your Email' />
            <button type='submit'>Submit</button>
          </form>
        </div>

      ) : null}
    </div>
  )
}

export default QuestionModal
