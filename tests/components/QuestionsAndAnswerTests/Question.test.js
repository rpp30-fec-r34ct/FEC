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
 import { regeneratorRuntime } from 'regenerator-runtime'



// components
import Question from '../../../client/src/QAComponents/Question.jsx'

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

xdescribe('Individual Question Component', () => {
  test('Should render a Question', function () {
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
    expect(app.container.querySelector("div[class='question-body']")).toBeInTheDocument()
  })
})