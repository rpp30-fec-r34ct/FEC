/* eslint-disable */
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
import QuestionModal from '../../../client/src/QAComponents/QuestionModal.jsx'

xdescribe('Individual Question Component', () => {
  test('Should NOT render by default', function () {
    let app
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:id'>
            <QuestionModal />
          </Route>
        </Switch>
      </Router>
    )
    expect(app.container.querySelector("div[class='add-question-form']")).toBeInTheDocument()
  })

  test('Should render a form', function () {
    let app
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:id'>
            <QuestionModal />
          </Route>
        </Switch>
      </Router>
    )
    expect(app.container.querySelector("div[class='add-question-form']")).toBeInTheDocument()
  })

  test('Should render a form with an input for the question', function () {
    let app
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:id'>
            <QuestionModal />
          </Route>
        </Switch>
      </Router>
    )
    expect(app.container.querySelector("input[name='question']")).toBeInTheDocument()
  })

  test('Should render a form with an input for the nickname of the asker', function () {
    let app
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:id'>
            <QuestionModal />
          </Route>
        </Switch>
      </Router>
    )
    expect(app.container.querySelector("input[name='nickname']")).toBeInTheDocument()
  })

  test('Should render a form with an input for the email address of the asker', function () {
    let app
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:id'>
            <QuestionModal />
          </Route>
        </Switch>
      </Router>
    )
    expect(app.container.querySelector("input[name='email']")).toBeInTheDocument()
  })
})
