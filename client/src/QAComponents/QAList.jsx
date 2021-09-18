import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './QA.css'
import Question from './Question.jsx'
import QuestionModal from './QuestionModal.jsx'
// import './Test.jsx';

const QAList = () => {
  const [answerCount, setAnswerCount] = useState(2)
  const [questions, setQuestions] = useState(['test1', 'test2', 'test3'])
  const [allQuestions, setAllQuestions] = useState()
  const [firstRender, setFirstRender] = useState(true)
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const productID = useParams().productId

  // const parseAnswers = (answers) => {
  //   let result = [];
  //   for (let key in answers) {
  //     result.push(answers[key]);
  //     for (let answer in key) {

  //     }
  //   }
  //   // console.log('???', result);
  //   return result;
  // }

  const getAllQuestions = () => {
    // setFirstRender(prev => { return prev = false; })
    // return console.log(firstRender);
    axios.get('/qa/questions?product_id=' + productID)
      .then((data) => {
        console.log('questions received...', data.data.results)
        if (data.data.results) {
          setQuestions((prev) => {
            return prev = data.data.results
          })
          setAllQuestions((prev) => {
            return prev = data.data.results
          })
        }
      })
      .catch((err) => {
        console.error('error while getting product data from server')
      })
  }

  const renderAllQuestions = () => {
    console.log('ALL OF THE QUESTIONS', allQuestions)
    setQuestions((prev) => {
      return prev = allQuestions
    })
  }

  // const getAllAnswers = (question, callback) => {
  //   console.log('getting all questions...', question);
  //   if (question === undefined) {
  //     return;
  //   }
  //   axios.get('/qa/answers?question_id=' + question)
  //   .then(data => {
  //     console.log('all answers', data);
  //     callback(null, data);
  //   })
  //   .catch(err => console.log(err));
  // }

  const addQuestion = (e) => {
    e.preventDefault()
    console.log('event clicked')
    setShowQuestionModal(true)
  }

  const addAnswer = () => {
    console.log('adding answer')
  }

  const initialize = (callback) => {
    // e.preventDefault();
    axios.get('/qa/questions' + '?product_id=' + productID)
      .then((data) => {
<<<<<<< HEAD
        // console.log('questions received from server for product', data.data.results);
=======
      // console.log('questions received from server for product', data.data.results);
>>>>>>> c2acb89980fc6c368f0c31d888ee59a530880a86
        callback(null, data.data.results)
      })
      .catch((err) => {
        console.error('error while getting product data from server')
      })
  }

  // const addHelpfulAnswer = () => {
  //   console.log('this question was helpful');
  // }

  // const reportAnswer = () => {
  //   console.log('Answer Reported');
  // }

  useEffect(() => {
    initialize((err, data) => {
      if (err) {
        console.error(err)
      } else {
        setQuestions(prev => {
          return prev = data.slice(0, 2)
          // console.log('data', );
        })
        setAllQuestions(prev => {
          return prev = data
          // console.log('data', );
        })
      }
    })
    console.log('questions', questions)
  }, [])

  return (
    <>
      <h1>Questions and Answers</h1>
      {/* <Question /> */}
      {/* <Question firstRender={firstRender}/> */}
      <form>
        <input id='search-bar' type='text' placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS' />
      </form>
      {/* {console.log('questions?', questions)} */}
      {questions.map(question => {
        // console.log('questions?????', question);
        return (
          <Question
            asker={question.asker_name}
            question_body={question.question_body}
            question_helpfulness={question.question_helpfulness}
            question_id={question.question_id}
          />
        )
      })}
      <QuestionModal showQuestionModal={showQuestionModal} />
      <button onClick={renderAllQuestions}>More Answered Questions</button>
      <button onClick={addQuestion}>Add A Question</button>
    </>
  )
}

export default QAList
