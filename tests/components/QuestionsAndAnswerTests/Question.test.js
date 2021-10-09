/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { createMemoryHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import regeneratorRuntime from 'regenerator-runtime'

// components
import Question from '../../../client/src/QAComponents/Question.jsx'
import AnswerList from '../../../client/src/QAComponents/AnswerList.jsx'
import AnswerModal from '../../../client/src/QAComponents/AnswerModal.jsx'

// const testResponse = { product_id: '47421', results: []}
// // { key: 1, answers: { 3715723: { answerer_name: 'Oje', body: 'Tested and approved', date: '2021-02-23T00:00:00.000Z', helpfulness: 12, id: 3715723, photos: [] } }, asker_name: 'Oje', question_body: 'This test should work', question_helpfulness: 17, question_id: 101501, question_date: '2021-03-31T00:00:00.000Z', reported: false }

// const handlers = [
//   rest.get('/qa/questions', (req, res, ctx) => {
//     return res(
//       ctx.json(testResponse)
//       )
//     })
//       ]

// const server = setupServer(...handlers)

// beforeAll(()=> server.listen())
// afterEach(()=> server.resetHandlers())
// afterAll(()=> server.close())

describe('Individual Question Component', () => {
  test('Should render a Question', function () {
    let app
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:id'>
            <Question />
          </Route>
        </Switch>
      </Router>
    )
    expect(app.container.querySelector("div[class='question-body']")).toBeInTheDocument()
  })
  test('Should mark a question as helpful', async function () {
    let app
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:id'>
            <Question
            key={1}
            asker={'Oje'}
            question_body={'Will this test work?'}
            question_helpfulness={0}
            question_id={123456}
            />
          </Route>
        </Switch>
      </Router>
    )
    const helpfulLink = app.container.querySelector("a[id='helpful-question']")
    let helpfulness = app.container.querySelector("span[id='question-helpfulness']")
    expect(helpfulness.innerHTML).toEqual('0')
    fireEvent.click(helpfulLink)
    setTimeout(()=>{
      expect(helpfulness.innerHTML).toEqual('1')
    }, 500)
  })

  test('Should toggle the Answer Modal', function () {
    let app
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:id'>
            <Question
            key={1}
            asker={'Oje'}
            question_body={'Will this test work?'}
            question_helpfulness={0}
            question_id={123456}
            />
          </Route>
        </Switch>
      </Router>
    )
    expect(app.container.querySelector("div[id='answer-modal']")).not.toBeInTheDocument()
    const button = app.container.querySelector("button[id='add-answer']")
    fireEvent.click(button)
    expect(app.container.querySelector("div[id='answer-modal']")).toBeInTheDocument()
  })

  test('Should toggle the answer modal by pressing escape', function () {
    var app;
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path="/product/:id">
            <Question />
          </Route>
        </Switch>
      </Router>,
    )
    const button = app.container.querySelector("button[id='add-answer']")
    fireEvent.click(button)
    expect(app.container.querySelector("div[id='answer-modal']")).toBeInTheDocument()
    fireEvent.keyDown(app.container, {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      charCode: 27
    })
    expect(app.container.querySelector("div[id='answer-modal']")).not.toBeInTheDocument()
   })
})
