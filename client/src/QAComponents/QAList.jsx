/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './QA.css'
import Question from './Question.jsx'
import QuestionModal from './QuestionModal.jsx'

const QAList = (props) => {
  const [answerCount, setAnswerCount] = useState(2)
  const [questions, setQuestions] = useState([])
  const [allQuestions, setAllQuestions] = useState()
  const [questionsCache, setQuestionsCache] = useState()
  const [firstRender, setFirstRender] = useState(true)
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const productID = useParams().productId

  const qListStyle = {
    border: '1px solid black',
    padding: '5%',
    height: '400px',
    overflow: 'scroll',
    alignItems: 'center',
  }
  const searchStyle = {
    width: '99.1%',
    margin: 'auto',
    height: '10%',
  }
  const searchBarStyle = {
    width: '99.1%',
    margin: 'auto',
    height: '100%',
  }
  const moreQuestionsStyle = {
    width: '50%',
    backgroundColor: 'blue',
    color: 'white',
  }
  const addQuestionStyle = {
    width: '50%',
    backgroundColor: 'green',
    color: 'white',
  }
  const fullQuestionButtonStyle = {
    width: '100%',
    backgroundColor: 'green',
    color: 'white',
  }
  const headingStyle = {
    fontFamily: 'Playfair Display, serif',
  }
  const renderAllQuestions = () => {
    setQuestions(allQuestions.slice(0, questions.length + 2))
    setFirstRender(false)
  }

  const keyPress = (e) => {
    if (e.key === 'Escape') {
      setShowQuestionModal(false)
    }
  }

  const handleClickOutside = (e) => {
    if (e.target.id === 'question-modal' && e.target.className !== 'add-question-form') {
      setShowQuestionModal(false)
    }
    if (e.target.className === "close-button") {
      setShowQuestionModal(false)
    }
    if (e.target.id === "submit-question") {
      document.getElementsByClassName('add-question-form')[0].append('Question Submitted')
      setTimeout(()=>{
        setShowQuestionModal(false)
      }, 1000)
    }
  }

  const addQuestion = (e) => {
    e.preventDefault()
    setShowQuestionModal(true)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setQuestions([])
    const query = e.target.value.toLowerCase();
    if (e.target.value.length >= 3) {
      questionsCache.map(question => {
        if (question.question_body.toLowerCase().includes(e.target.value)) {
          setQuestions(prev => [...prev, question])
        }
      })
    } else {
      if (firstRender) {
        setQuestions(questionsCache.slice(0, 2))
      } else {
        setQuestions(questionsCache)
      }
    }
  }

  const handleModalChange = (e) => {
    axios.get('/qa/questions' + '?product_id=' + productID)
    .then(data => {
      setQuestions(data.data.results.slice(0, 2))
      setAllQuestions(data.data.results)
      setQuestionsCache(data.data.results)
    })
    .catch((err) => {
      return err
    })
  }

  useEffect(() => {
    axios.get('/qa/questions' + '?product_id=' + productID)
      .then(data => {
        setQuestions(data.data.results.slice(0, 2))
        setAllQuestions(data.data.results)
        setQuestionsCache(data.data.results)
      })
      .catch((err) => {
        return err
      })
      document.addEventListener('keydown', keyPress)
      document.addEventListener('click', handleClickOutside)
      return () => {
        document.removeEventListener('keydown', keyPress)
        document.removeEventListener('click', handleClickOutside)
      }

  }, [])

  return (
    <>
      <h1 style={headingStyle} id="QA-heading">Questions and Answers</h1>
      <div style={qListStyle}>
        <form style={searchStyle}>
          <input id='search-bar' type='text' placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS' onChange={handleSearch} onSubmit={handleSearch} style={searchBarStyle} />
        </form>
        {questions ? questions.sort((question1, question2) => question2.question_helpfulness - question1.question_helpfulness).map((question, i) => {
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
        {showQuestionModal ? <QuestionModal />: null}
      </div>
        {allQuestions && allQuestions.length > questions.length ? <button style={moreQuestionsStyle} id="more-questions" onClick={renderAllQuestions}>More Answered Questions</button> : null}
        <button style={allQuestions && allQuestions.length > questions.length ? addQuestionStyle : fullQuestionButtonStyle} id="add-question" onClick={addQuestion}>Add A Question + </button>
    </>
  )
}

export default QAList
