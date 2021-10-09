/* eslint-disable */
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
  const [helpful, setHelpful] = useState(false)
  const [updateAnswers, setUpdateAnswers] = useState(false)
  const productID = useParams().productId

  const questionBodyStyle = {
    borderTop: '1px solid',
    marginTop: '5%',
    // padding: '2%',
    width: '100%',
    display: 'grid',
    // justifyContent: 'left',
    // textAlign: 'left',
  }

  const questionStyle = {
    // border: '1px solid black',
    align: 'left',
    // marginRight: '500px',
    width: '80%',
    display: 'grid',
    justifyContent: 'left',
  }

  const tableRowStyle = {
    textAalign: 'right',
  }

  const addAnswerStyle = {
    border: 'none',
    backgroundColor: 'transparent',
    backgroundRepeat: 'no-repeat',
    outline: 'none',
    height: '100%',
    color: 'grey',
    // width: '100%',
    fontSize: '100%',
    fontFamily: 'Arial, Helvetica, sans-serif',
    // borderLeft: '1px solid',
    // marginLeft: '50%',
  }

  const helpfulStyle = {
    color: 'grey',
    textAlign: 'right',
    // width: '20%',
    fontSize: '100%',
    fontFamily: 'Arial, Helvetica, sans-serif',
  }

  const helpfulButtonStyle = {
    color: 'limeGreen',
    textDecoration: 'underline',
  }

  const tableStyle = {
    tableLayout: 'fixed',
    width: '100%',
    fontSize: '100%',
    fontFamily: 'Arial, Helvetica, sans-serif',
  }

  // const handleModalChange = () => props.handleModalChange()

  const addAnswer = (e) => {
    e.preventDefault()
    return setShowModal(true)
  }

  const keyPress = (e) => {
    if (e.key === 'Escape') {
      setShowModal(false)
    }
  }

  const handleClickOutside = (e) => {
    if (e.target.id === 'answer-modal' && e.target.className !== 'add-answer-form') {
      setShowModal(false)
    }
    if (e.target.className === "close-button") {
      setShowModal(false)
    }
  }

  const handleModalChange = (e) => {
    if (e.target[4].id === "submit-answer") {
      document.getElementsByClassName('add-answer-form')[0].append('Answer Submitted')
      setTimeout(()=>{
        setShowModal(false)
      }, 500)
    }
    setUpdateAnswers(true)
  }

  const addHelpfulQuestion = (e) => {
    e.preventDefault()
    if (!helpful) {
      setHelpful(true)
      axios.put('/qa/helpfulquestion?question_id=' + e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id, {
        question_id: e.target.id
      })
        .then(data => {
          setQHelpfulness(qHelpfulness + 1)
        })
        .catch(err => { err })
    } else {
      return
    }
  }

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress)
      document.addEventListener('click', handleClickOutside)
      return () => {
        document.removeEventListener('keydown', keyPress)
        document.removeEventListener('click', handleClickOutside)
      }
    },
    [showModal]
  )

  return (
    <>
      <div style={questionBodyStyle} id={props.question_id} className='question-body'>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <th style={questionStyle}>
                Q: {props.question_body}
              </th>
              <td style={helpfulStyle} className="helpful">
                <span className="panel-element" id="helpful-question" className='helpful'>Helpful?</span> | <b style={helpfulButtonStyle} onClick={addHelpfulQuestion}> Yes </b>
                (<span id="question-helpfulness">{qHelpfulness ? qHelpfulness : props.question_helpfulness}</span>)
              </td>
              <td>
                <button style={addAnswerStyle} id='add-answer' className="panel-element" onClick={addAnswer}>ADD ANSWER</button>
              </td>
            </tr>
            <tr>
            </tr>
          </tbody>
        </table>
      {props.question_id ? <AnswerList id={props.question_id} updateAnswers={updateAnswers}/> : null}
      </div>
      <div>
      </div>
      {showModal ? <AnswerModal handleModalChange={handleModalChange} question_id={props.question_id} body={props.question_body} /*handleModalChange={(e)=>{handleModalChange(e)}}*//> : null}
    </>
  )
}

export default Question
