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
import { act } from 'react-dom/test-utils'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ environment: 'dev', service: 'fakeService', productId: 47421 }),
}))

// components
import QAList from '../../client/src/QAComponents/QAList.jsx'

const testResponse = { asker: 'Oje', question_body: 'This test should work', question_helpfulness: '17', question_id: '01501' }


const handlers = [
  rest.get('/qa/questions', (req, res, ctx) => {
    return res(
      ctx.json(testResponse)
    )
    }),
    rest.get('/qa/answers', (req, res, ctx) => {

      }),
      rest.get('/qa/helpfulquestion', (req, res, ctx) => {

        })
      ]

const server = setupServer(...handlers)

beforeAll(()=> server.listen())
afterEach(()=> server.resetHandlers())
afterAll(()=> server.close())

describe('QA List', () => {
  test('Should render the Q/A List', () => {
    const qalist = render(<QAList key={0}/>)
    expect(qalist.getByText('Questions and Answers')).toBeInTheDocument()
  })

  test('Should have a search bar', () => {
    const qalist = render(<QAList key={1}/>)
    expect(qalist.container.querySelector("input[id='search-bar']")).toBeInTheDocument()
  })

  test('Should render a question from the Question component', () => {
    const qalist = render(<QAList key={2}/>)
    expect(qalist.container.querySelector("div[class='question-body']")).toBeInTheDocument()
  })

  test('Should render a question from the Question component', () => {
    const qalist = render(<QAList key={5}/>)
    const buttons = qalist.getAllByRole('button')
    expect(buttons.length).toBe(2)
  })

  test('Should render a button to show more answered questions', () => {
    const qalist = render(<QAList key={3}/>)
    expect(qalist.container.querySelector("button[id='more-questions']")).toBeInTheDocument()
  })

  test('Should render a button to add a question', () => {
    const qalist = render(<QAList key={4}/>)
    expect(qalist.container.querySelector("button[id='add-question']")).toBeInTheDocument()
  })

  test('Should render a question from get request', function () {
    let app;
    act(()=>{
      const history = createMemoryHistory()
      const route = '/product/47421'
      history.push(route)
      app = render(
        <Router history={history}>
          <Switch>
            <Route path="/product/:id" component={QAList}/>
          </Switch>
        </Router>,
      )
    })
    setTimeout(()=>{
      expect(app.container.querySelector("div[id='01501']")).toBeInTheDocument()
    }, 5000)

  })


})
