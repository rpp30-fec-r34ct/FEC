/* eslint-disable */
import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import ReactDOM from 'react-dom'
import axios from 'axios'

const QuestionModal = (props) => {
  const modalRef = useRef()
  const [showQuestionModal, setShowQuestionModal] = useState(true)
  const productID = useParams().productId
  const modalStyle = {
    display: 'grid',
    justifyContent: 'center',
    gridTemplateColumns: 'auto auto auto auto auto',
    gridTemplateRows: 'auto auto auto auto auto',
    position: 'fixed',
    zIndex: '999999999999',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgb(0,0,0)',
    backgroundColor: 'rgba(0,0,0,0.4)',
  }
  const formStyle = {
    gridColumn: '1 / span 4',
    gridRow: '1',
    position: 'fixed',
    margin: '15% auto',
    padding: '20px',
    backgroundColor: 'whitesmoke',
    border: '3px solid grey',
    width: '80%',
  }

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
    .catch(err => console.error(err))
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
          <div style={modalStyle} id="question-modal">
          <div style={formStyle} className='add-question-form' id={props.product_id}>
            <button className="close-button" onClick={()=> setShowQuestionModal(false)}>X</button>
            <h1>Product: {document.getElementsByClassName('card-name')[0] ? document.getElementsByClassName('card-name')[0].innerHTML : 'Product'}</h1>
            <form onSubmit={submitNewQuestion}>
              <input name='question' maxLength="1000" size="100" type='text' className="modal-textbox" placeholder='Your Question' />
              <input name='nickname' size="30" type='text' placeholder='Your Nickname' />
              <input name='email' size="30" type='text' placeholder='Example: jack@email.com' />
              <button type='submit'>Submit</button>
            </form>
          </div>
          </div>

        ) : null}
    </>
  )
}

export default QuestionModal
