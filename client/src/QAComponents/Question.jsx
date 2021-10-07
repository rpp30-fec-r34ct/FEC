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
    // border: '1px solid blue',
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
    width: '100%',
    display: 'grid',
    justifyContent: 'left',
  }

  const tableRowStyle = {
    textAalign: 'right',
  }

  const addAnswerStyle = {
    height: '100%',
    width: '100%',
    fontSize: '100%',
    fontFamily: 'Arial, Helvetica, sans-serif',
    // marginLeft: '50%',
  }

  const helpfulStyle = {
    color: 'green',
    textAlign: 'left',
    width: '375px',
    fontSize: '100%',
    fontFamily: 'Arial, Helvetica, sans-serif',
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
    console.log('answer submitted', e.target[4].id)
    if (e.target[4].id === "submit-answer") {
      setShowModal(false)
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
          console.log(data)
          setQHelpfulness(qHelpfulness + 1)
        })
        .catch(err => { console.error(err) })
    } else {
      return console.log('You have already indicated this question as being helpful')
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
            </tr>
            <tr>
              <td style={helpfulStyle} className="helpful">
                <a className="panel-element" href="" id="helpful-question" className='helpful' onClick={addHelpfulQuestion}>Helpful?</a> | Yes
                ({qHelpfulness ? qHelpfulness : props.question_helpfulness})
              </td>
              <td>
                <button style={addAnswerStyle} href="" id='add-answer' className="panel-element" onClick={addAnswer}>ADD ANSWER</button>
              </td>
            </tr>
          </tbody>
        </table>
      {props.question_id ? <AnswerList id={props.question_id} updateAnswers={updateAnswers}/> : null}
      </div>
      <div>
      </div>
      {showModal ? <AnswerModal question_id={props.question_id} body={props.question_body} /*handleModalChange={(e)=>{handleModalChange(e)}}*//> : null}
    </>
  )
}

export default Question
