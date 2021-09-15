/* eslint-disable */
import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import ReactDOM from 'react-dom'
import axios from 'axios'

const QuestionModal = (props) => {
  console.log('props', props.showQuestionModal)
  const modalRef = useRef()
  const [showQuestionModal, setShowQuestionModal] = useState(props.showQuestionModal)
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
    // console.log(props.question_id);
    const answer = e.target[0].value
    const nickname = e.target[1].value
    const email = e.target[2].value
    const id = e.target.parentNode.id
    console.log('adding answer...', answer, nickname, email, e.target.parentNode.id)
    // axios.post('http://localhost:3000/qa/answer?answer=' + answer + '&nickname=' + nickname + '&email=' + email + '&id=' + id, {
    //   answer: answer,
    //   nickname: nickname,
    //   email: email,
    //   id: id
    // })
    // .then(data => {
    //   console.log(data);
    // })
    // .catch(err => console.error(err));
  }

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress)
      return () => document.removeEventListener('keydown', keyPress)
    },
    [keyPress]
  )

  return (
    <>
      {props.showQuestionModal ? (
        <div className='add-question-form' id={props.product_id}>
          <h1>Product</h1>
          <form onSubmit={submitNewQuestion}>
            <input name='answer' type='text' placeholder='Your Answer' />
            <input name='nickname' type='text' placeholder='Your Nickname' />
            <input name='email' type='text' placeholder='Your Email' />
            <button type='submit'>Submit</button>
          </form>
        </div>

      ) : null}
    </>
  )
}

export default QuestionModal
