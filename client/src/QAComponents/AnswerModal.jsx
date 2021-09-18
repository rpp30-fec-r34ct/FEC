import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import ReactDOM from 'react-dom'
import axios from 'axios'

const AnswerModal = (props) => {
  console.log('props', props.showModal)
  const modalRef = useRef()
  const [showModal, setShowModal] = useState(props.showModal)
  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false)
    }
  }

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false)
        console.log('Escape key pressed')
      }
    },
    [setShowModal, showModal]
  )

  const submitNewAnswer = (e) => {
    e.preventDefault()
    // console.log(props.question_id);
    const answer = e.target[0].value
    const nickname = e.target[1].value
    const email = e.target[2].value
    const id = e.target.parentNode.id
    console.log('adding answer...', answer, nickname, email, e.target.parentNode.id)
    axios.post('http://localhost:3000/qa/answer?answer=' + answer + '&nickname=' + nickname + '&email=' + email + '&id=' + id, {
      answer: answer,
      nickname: nickname,
      email: email,
      id: id
    })
      .then(data => {
        console.log(data)
      })
      .catch(err => console.error(err))
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
      {props.showModal ? (
        <div className='add-answer-form' id={props.question_id}>
          <h1>Product, Question Body</h1>
          <form onSubmit={submitNewAnswer}>
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

export default AnswerModal
