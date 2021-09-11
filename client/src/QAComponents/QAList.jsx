import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const productID = 47421;

const QAList = () => {

  const initialize = (e) => {
    e.preventDefault();
    axios.get('/qa/questions' + '?product_id=' + productID)
    .then((data) => {
      console.log('data received from server for product', data);
    })
    .catch ((err) => {
      console.error ('error while getting product data from server');
    })
  }
  const [questions, setQuestions] = useState(['test1', 'test2', 'test3']);
  const addquestion = (event) => {
    setQuestions(prev => [event.target.value, ... prev]);
  };
  return (
    <div>
      <div>{questions}</div>
      <button onClick={initialize}>More Questions</button>
    </div>
  )
}

export default QAList;