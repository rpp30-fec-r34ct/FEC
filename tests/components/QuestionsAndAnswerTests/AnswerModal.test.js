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
 import AnswerModal from '../../../client/src/QAComponents/AnswerModal.jsx'

 describe('Individual Question Component', () => {


   xtest('Should not render by default', function () {
    var app;
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path="/product/:id">
            <AnswerModal />
          </Route>
        </Switch>
      </Router>,
    )
     expect(app.container.queryByText('Product')).toBeNull()
   })

   xtest('Should render if props.showModal is true', function () {
    var app;
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path="/product/:id">
            <AnswerModal />
          </Route>
        </Switch>
      </Router>,
    )
     expect(app.container.getByText('Product, Question Body')).toBeInTheDocument()
   })

   test('Should render a form', function () {
    var app;
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path="/product/:id">
            <AnswerModal />
          </Route>
        </Switch>
      </Router>,
    )
     expect(app.container.querySelector("div[class='add-answer-form']")).toBeInTheDocument()
   })

   test('Should render a form with an input for the question', function () {
    var app;
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path="/product/:id">
            <AnswerModal />
          </Route>
        </Switch>
      </Router>,
    )
     expect(app.container.querySelector("input[name='answer']")).toBeInTheDocument()
   })

   test('Should render a form with an input for the nickname of the asker', function () {
     var app;
     const history = createMemoryHistory()
     const route = '/product/47421'
     history.push(route)
     app = render(
       <Router history={history}>
         <Switch>
           <Route path="/product/:id">
             <AnswerModal />
           </Route>
         </Switch>
       </Router>,
     )
     expect(app.container.querySelector("input[name='nickname']")).toBeInTheDocument()
   })

   test('Should render a form with an input for the email address of the asker', function () {
    var app;
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path="/product/:id">
            <AnswerModal />
          </Route>
        </Switch>
      </Router>,
    )
     expect(app.container.querySelector("input[name='email']")).toBeInTheDocument()
   })
 })