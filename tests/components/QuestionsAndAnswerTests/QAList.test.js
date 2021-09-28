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

// setTimeout(()=>{
//   expect(app.container.querySelector("div[id='01501']")).toBeInTheDocument()
// }, 5000)

// components
import QAList from '../../../client/src/QAComponents/QAList.jsx'

const testResponse = { product_id: '47421', results: []}
// { key: 1, answers: { 3715723: { answerer_name: 'Oje', body: 'Tested and approved', date: '2021-02-23T00:00:00.000Z', helpfulness: 12, id: 3715723, photos: [] } }, asker_name: 'Oje', question_body: 'This test should work', question_helpfulness: 17, question_id: 101501, question_date: '2021-03-31T00:00:00.000Z', reported: false }


const handlers = [
  rest.get('/qa/questions', (req, res, ctx) => {
    return res(
      ctx.json(testResponse)
      )
    })
      ]

const server = setupServer(...handlers)

beforeAll(()=> server.listen())
afterEach(()=> server.resetHandlers())
afterAll(()=> server.close())

xdescribe('QA List', () => {
  test('Should render the Q/A List', () => {
    var app;
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path="/product/:id">
            <QAList />
          </Route>
        </Switch>
      </Router>,
    )
    // setTimeout(()=>{
    expect(app.container.querySelector("h1[id='QA-heading']")).toBeInTheDocument()
  // }, 5000)
  })

  test('Should have a search bar', () => {
    var app;
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path="/product/:id">
            <QAList />
          </Route>
        </Switch>
      </Router>,
    )
    expect(app.container.querySelector("input[id='search-bar']")).toBeInTheDocument()
  })

  test('Should render a question from the Question component', () => {
    var app;
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path="/product/:id">
            <QAList />
          </Route>
        </Switch>
      </Router>,
    )
    expect(app.container.querySelector("div[class='question-body']")).toBeInTheDocument()
  })

  test('Should render buttons', () => {
    var app;
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path="/product/:id">
            <QAList />
          </Route>
        </Switch>
      </Router>,
    )
    expect(app.container.querySelector('button')).toBeInTheDocument()
    // expect(buttons.length).toBe(2)
  })

  // test('Should render a button to show more answered questions', async () => {
  //   var app;
  //   const history = createMemoryHistory()
  //   const route = '/product/47421'
  //   history.push(route)
  //   app = render(
  //     <Router history={history}>
  //       <Switch>
  //         <Route path="/product/:id">
  //           <QAList />
  //         </Route>
  //       </Switch>
  //     </Router>,
  //   )
  //   expect(await app.container.querySelector("button[id='more-questions']")).toBeInTheDocument()
  // })

  test('Should render a button to add a question', () => {
    var app;
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path="/product/:id">
            <QAList />
          </Route>
        </Switch>
      </Router>,
    )
    expect(app.container.querySelector("button[id='add-question']")).toBeInTheDocument()
  })

  test('Should render a question from get request', function () {
    var app;
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path="/product/:id">
            <QAList />
          </Route>
        </Switch>
      </Router>,
    )
    setTimeout(()=>{
      expect(app.container.querySelector("div[id='01501']")).toBeInTheDocument()
    }, 5000)

  })


})
