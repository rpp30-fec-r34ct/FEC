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
  const productID = useParams().productId

  // SERVER REQUESTS
  // const initialize = (callback) => {
  //   axios.get('/qa/questions' + '?product_id=' + productID)
  //     .then((data) => {
  //       callback(null, data.data.results)
  //     })
  //     .catch((err) => {
  //       console.error('error while getting product data from server')
  //     })
  // }

  const addAnswer = (e) => {
    e.preventDefault()
    return setShowModal(true)
    // if (!document.getElementById('answer-modal')) {
    //   console.log('modal is not shown')
    //   setShowModal(true)
    // }
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

  const addHelpfulQuestion = (e) => {
    e.preventDefault()
    if (!helpful) {
      setHelpful(true)
      axios.put('/qa/helpfulquestion?question_id=' + e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id, {
        question_id: e.target.id
      })
        .then(data => {
          setQHelpfulness(prev => prev++)
          return console.log('helpful', helpful)

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
      <div id={props.question_id} className='question-body'>
        <table>
          <tbody>
            <tr>
              <th>
                Q: {props.question_body}
              </th>
            </tr>
            <tr>
              <td>
                Helpful?
              </td>
              <td>
                <a className="panel-element" href="" id="helpful-question" className='helpful' onClick={addHelpfulQuestion}>Yes</a>
              </td>
              <td className="panel-element">
                ({qHelpfulness ? qHelpfulness : props.question_helpfulness})
              </td>
              <td>
                <a href="" id='add-answer' className="panel-element" onClick={addAnswer}>ADD ANSWER</a>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="question-panel">
        </div>
      </div>
      <div>
      {props.question_id ? <AnswerList id={props.question_id}/> : null}
      </div>
      {showModal ? <AnswerModal question_id={props.question_id} body={props.question_body}/> : null}
    </>
  )
}

export default Question
