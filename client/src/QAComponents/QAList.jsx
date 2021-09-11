import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './QA.css';


const QAList = () => {
  const [answerCount, setAnswerCount] = useState(2);
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

  const getAllQuestions = (event) => {
    axios.get('/qa/questions?product_id=' + productID)
    .then((data) => {
      console.log('questions received from server for product', data.data.results[0].answers);
      setQuestions(data.data.results);
    })
    .catch ((err) => {
      console.error ('error while getting product data from server');
    })
  };

  const getAllAnswers = (question, callback) => {
    console.log('getting all answers...');
    axios.get('/qa/all_answers?question_id=' + question)
    .then(data => {
      console.log('all answers', data);
      callback(null, data);
    })
    .catch(err => console.log(err));
  }

  const addQuestion = (e) => {
    e.preventDefault();
    console.log('event clicked');
  };

  const addAnswer = () => {
    console.log('adding answer');
  }

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

  const addHelpfulQuestion = (e) => {
    console.log('this question was helpful', e.target.id);
    axios.post('/qa/helpfulquestion?question_id=' + e.target.id, {
      'question_id': e.target.id
    })
    .then(data => console.log(data) );
  }

  const addHelpfulAnswer = () => {
    console.log('this question was helpful');
  }

  const reportAnswer = () => {
    console.log('Answer Reported');
  }

  return (
    <div>
      <h1>Questions and Answers</h1>
      <form>
        <input id="search-bar" type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS"></input>
      </form>
      <div>{questions.map(question => {
        let answers;
        getAllAnswers(question.question_id, (err, answers) => {
          if (err) {
            return console.log(err);
          } else {
            if (answerCount) {
              answers = answers.slice(0, 1);
            }
            return (
              <div className="question-block"><div className="question-body">Q: {question.question_body}<div id={question.question_id} className="helpful-question" onClick={addHelpfulQuestion}>Helpful?</div> ({question.question_helpfulness})  |  <div className="add-answer" onClick={addAnswer}>Add Answer</div></div>
                    <div>
                      <div className="answer"><h4>A:</h4> {answers[0].body}
                        <div> by {answers[0].answerer_name}, {answers[0].date}  |  <div className="helpful-answer" onClick={addHelpfulAnswer}>Helpful? Yes ({answers[0].helpfulness})</div>
                          <div className="load-answers" onClick={setAnswerCount((prev)=> prev = null)}>LOAD MORE ANSWERS</div>
                          <div className="report" onClick={reportAnswer}>Report</div>
                        </div>
                      </div>
                    </div>
              </div>
            )
          }
        });

        })}</div>
      <button onClick={getAllQuestions}>More Answered Questions</button>
      <button onClick={addQuestion}>Add A Question</button>
    </div>
  )
}

export default QAList;