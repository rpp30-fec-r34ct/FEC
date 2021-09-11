import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const QAList = (props) => (
  (
    <div>
      <table>
      {props.questions.map(question => {
         return (
          <div>
            <button onClick={props.newQuestion}>Ask a Question</button>
              <tr>
                <th>Question:</th>
                <td>{question.Question}</td>
              </tr>
              <tr>
                <th>Answers:</th>
                <td>
                {question.Answers.map(answer => { return <p>{answer}</p> })}
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <button>Report</button>
                </td>
              </tr>
          </div>
          )
        })}
      </table>
      <button onClick={props.addQuestions}>More Questions</button>
    </div>
  )
)

export default QAList;