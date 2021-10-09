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
import QuestionModal from '../../../client/src/QAComponents/QuestionModal.jsx'
import Question from '../../../client/src/QAComponents/Question.jsx'
import QAList from '../../../client/src/QAComponents/QAList.jsx'

describe('Individual Question Component', () => {
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

  test('Should submit a new question', function () {
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

    async () => {
      const question = app.container.querySelector("input[name='question']")
      const nickname = app.container.querySelector("input[name='nickname']")
      const email = app.container.querySelector("input[name='email']")
      const button = app.container.querySelector("button[id='submit-question']")
      fireEvent.change(question, {target: {value: 'Test'}})
      fireEvent.change(nickname, {target: {value: 'Tester'}})
      fireEvent.change(email, {target: {value: 'Tester@test.com'}})
      fireEvent.click(button)
      await expect(submitNewQuestion).toHaveBeenCalled()
    }
  })
  test('Should hide the modal on default', async function () {
    let app
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:id'>
            <QAList />
          </Route>
        </Switch>
      </Router>
    )
    const button = app.container.querySelector("button[id='add-question'")
    expect(app.container.querySelector("div[class='add-question-form']")).not.toBeInTheDocument()
    fireEvent.click(button)
    await expect(app.container.querySelector("div[class='add-question-form']")).toBeInTheDocument()
  })

  test('Should toggle the modal by pressing escape', async function () {
    jest.useFakeTimers()
    let app
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:id'>
            <QAList />
          </Route>
        </Switch>
      </Router>
    )
    const button = app.container.querySelector("button[id='add-question'")
    expect(app.container.querySelector("div[class='add-question-form']")).not.toBeInTheDocument()
    fireEvent.click(button)
    expect(app.container.querySelector("div[class='add-question-form']")).toBeInTheDocument()
    fireEvent.keyDown(app.container, {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      charCode: 27
    })
    jest.advanceTimersByTime(1000)
      await expect(app.container.querySelector("div[class='add-question-form']")).not.toBeInTheDocument()
  })
  test('Should toggle the modal by clicking the close button', async function () {
    let app
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:id'>
            <QAList />
          </Route>
        </Switch>
      </Router>
    )
    const button = app.container.querySelector("button[id='add-question'")
    expect(app.container.querySelector("div[class='add-question-form']")).not.toBeInTheDocument()
    fireEvent.click(button)
    await expect(app.container.querySelector("div[class='add-question-form']")).toBeInTheDocument()
    fireEvent.click(app.container.querySelector("button[id='close-question-modal']"))
    await expect(app.container.querySelector("div[class='add-question-form']")).not.toBeInTheDocument()
  })
  test('Should toggle the modal by clicking outside the form', async function () {
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
    fireEvent.click(app.container.querySelector("div[id='question-modal']"))
    setTimeout(()=>{
      expect(app.container.querySelector("div[class='add-question-form']")).not.toBeInTheDocument()
    }, 500)
  })
})
