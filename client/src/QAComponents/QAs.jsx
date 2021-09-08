import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Search from './Search.jsx';
import QAList from './QAList.jsx';

export default class QAs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          Question: 'Question 1',
          Answers: ['Answer 1', 'Answer 2', 'Answer 3']
        },
        {
          Question: 'Question 2',
          Answers: ['Answer 4', 'Answer 5', 'Answer 6']
        }
      ]
    }
  }

  render() {
    return (
      <div>
        <h1>Questions and Answers</h1>
        <Search />
        <QAList questions={this.state.list}/>
      </div>
    )
  }
}