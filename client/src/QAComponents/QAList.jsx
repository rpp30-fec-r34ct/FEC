import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactDOM from 'react-dom';
import axios from 'axios';


const QAList = () => {
  const [questions, setQuestions] = useState(['test1', 'test2', 'test3']);
  const productID = useParams().productId;

  const parseAnswers = (answers) => {
    let result = [];
    for (let key in answers) {
      result.push(answers[key]);
      for (let answer in key) {

      }
    }
    // console.log('???', result);
    return result;
  }

  const addQuestion = (event) => {
    axios.get('/qa/questions' + '?product_id=' + productID)
    .then((data) => {
      console.log('questions received from server for product', data.data.results[0].answers);
      setQuestions(data.data.results);
    })
    .catch ((err) => {
      console.error ('error while getting product data from server');
    })
  };

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    // e.preventDefault();
    axios.get('/qa/questions' + '?product_id=' + productID)
    .then((data) => {
      console.log('questions received from server for product', data.data.results);
      setQuestions([data.data.results[0], data.data.results[1]]);
    })
    .catch ((err) => {
      console.error ('error while getting product data from server');
    })
  };

  return (
    <div>
      <h1>Questions and Answers</h1>
      <form>
        <input type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS"></input>
      </form>
      <div>{questions.map(question => (
        <ul>
          <li>{question.asker_name} Asks...</li>
          <li>{question.question_body}
          <ul>
            {/* <li>{question.question_date}</li> */}
            {parseAnswers(question.answers).map(answer => {
              console.log(answer.body);
              return <li>{answer.body}</li>
            })}
          </ul>
          </li>
        </ul>
      ))}</div>
      <button onClick={addQuestion}>More Questions</button>
    </div>
  )
}

export default QAList;