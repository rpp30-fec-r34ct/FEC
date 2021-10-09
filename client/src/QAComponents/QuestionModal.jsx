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

  const submitNewQuestion = (e) => {
    e.preventDefault()
    if (!e.target[0].value || !e.target[1].value || !e.target[2].value) {
      return document.getElementsByClassName('add-question-form')[0].append('Your question could not be processed. You must enter ALL of the following: \nQuestion, \nYour Name, and \nYour Email Address')
    }
    if (!e.target[2].value.includes('@')) {
      return document.getElementsByClassName('add-question-form')[0].append('Please enter a valid email address\n\n')
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
    .then(data => null)
    .catch(err => err)
  }

  return (
    <>
      <div style={modalStyle} id="question-modal">
      <div style={formStyle} className='add-question-form' id={props.product_id}>
        <button id="close-question-modal" className="close-button">X</button>
        <h1>Product: {document.getElementsByClassName('card-name')[0] ? document.getElementsByClassName('card-name')[0].innerHTML : 'Product'}</h1>
        <form id="question-modal-form" onSubmit={submitNewQuestion}>
          <input name='question' maxLength="1000" size="100" type='text' className="modal-textbox" placeholder='Your Question' />
          <input name='nickname' size="30" type='text' placeholder='Your Nickname' />
          <input name='email' size="30" type='text' placeholder='Example: jack@email.com' />
          <button id="submit-question" type='submit'>Submit</button>
        </form>
      </div>
      </div>
    </>
  )
}

export default QuestionModal
