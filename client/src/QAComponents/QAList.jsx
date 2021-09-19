import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './QA.css'
import Question from './Question.jsx'
import QuestionModal from './QuestionModal.jsx'
// import './Test.jsx';

const QAList = (props) => {
  const [answerCount, setAnswerCount] = useState(2)
  const [questions, setQuestions] = useState(['test1', 'test2', 'test3'])
  const [allQuestions, setAllQuestions] = useState()
  const [firstRender, setFirstRender] = useState(true)
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const productID = useParams().productId

  const getAllQuestions = () => {
    axios.get('/qa/questions?product_id=' + productID)
      .then((data) => {
        if (data.data.results) {
          setQuestions(data.data.results)
          setAllQuestions(data.data.results)
        }
      })
      .catch((err) => {
        console.error('error while getting product data from server')
      })
  }

  const renderAllQuestions = () => {
    setQuestions(allQuestions)
    setAllQuestions(0)
  }

  const addQuestion = (e) => {
    e.preventDefault()
    console.log('event clicked')
    setShowQuestionModal(true)
  }

  const addAnswer = () => {
    console.log('adding answer')
  }

  const initialize = (callback) => {
    axios.get('/qa/questions' + '?product_id=' + productID)
      .then((data) => {
        callback(null, data.data.results)
      })
      .catch((err) => {
        console.error('error while getting product data from server')
      })
  }

  useEffect(() => {
    initialize((err, data) => {
      if (err) {
        console.error(err)
      } else {
        setQuestions(data.slice(0, 2))
        setAllQuestions(data)
      }
    })
  }, [])

  return (
    <>
      <h1>Questions and Answers</h1>
      <form>
        <input id='search-bar' type='text' placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS' />
      </form>
      {questions ? questions.map((question, i) => {
        let key = question.question_id + 1
        return (
          <Question
            key={i}
            asker={question.asker_name}
            question_body={question.question_body}
            question_helpfulness={question.question_helpfulness}
            question_id={question.question_id}
          />
        )
      }) : null}
      <QuestionModal showQuestionModal={showQuestionModal} />
      {allQuestions && allQuestions.length > 2 ? <button id="more-questions" onClick={renderAllQuestions}>More Answered Questions</button> : null}
      <button id="add-question" onClick={addQuestion}>Add A Question</button>
    </>
  )
}

export default QAList
