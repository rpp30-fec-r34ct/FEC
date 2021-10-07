/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { createMemoryHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import regeneratorRuntime from 'regenerator-runtime'

// setTimeout(()=>{
//   expect(app.container.querySelector("div[id='01501']")).toBeInTheDocument()
// }, 5000)

// components
import QAList from '../../../client/src/QAComponents/QAList.jsx'

const testResponse = {
  product_id: '47432',
  results: [
    {
      question_id: 396966,
      question_body: 'Occaecati dolores quia.',
      question_date: '2021-03-31T00:00:00.000Z',
      asker_name: 'Cory.Mosciski17',
      question_helpfulness: 29,
      reported: false,
      answers: {
        '3715723': { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: [ '=' ] },
        '3715724': { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: [ '=' ] }
      }
    },
    {
      question_id: 396964,
      question_body: 'Pariatur ullam laborum.',
      question_date: '2021-02-24T00:00:00.000Z',
      asker_name: 'Deshaun_Greenholt',
      question_helpfulness: 28,
      reported: false,
      answers: {
        '1234567': { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: [ '=' ] }
      }
    },
    {
      question_id: 396963,
      question_body: 'Eligendi ab tempora dignissimos nulla vel neque ex non doloremque.',
      question_date: '2021-02-12T00:00:00.000Z',
      asker_name: 'Erna.Rowe40',
      question_helpfulness: 24,
      reported: false,
      answers: {
        '3715682': { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: [ '=' ] },
        '3715684': { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: [ '=' ] },
        '3715685': { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: [ '=' ] },
        '3715686': { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: [ '=' ] },
        '3715687': { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: [ '=' ] },
        '3715688': { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: [ '=' ] },
        '3715689': { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: [ '=' ] },
        '3715690': { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: [ '=' ] },
        '3715691': { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: [ '=' ] },
        '3715693': { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: [ '=' ] },
        '3715694': { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: [ '=' ] },
        '3715695': { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: [ '=' ] },
        '3715696': { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: [ '=' ] },
        '3715697': { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: [ '=' ] }
      }
    },
    {
      question_id: 396962,
      question_body: 'Veritatis dolor neque eaque accusamus tempore asperiores.',
      question_date: '2021-01-30T00:00:00.000Z',
      asker_name: 'Zander.Witting10',
      question_helpfulness: 24,
      reported: false,
      answers: {
        '1234567': { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: [ '=' ] }
      }
    },
    {
      question_id: 396967,
      question_body: 'Beatae incidunt cumque voluptatem beatae in iure mollitia autem.',
      question_date: '2020-10-20T00:00:00.000Z',
      asker_name: 'Wilfrid.Thompson',
      question_helpfulness: 22,
      reported: false,
      answers: {
        '1234567': { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: [ '=' ] }
      }
    }
  ]
}

const testAnswer = [
  {
    answer_id: 3715724,
    body: 'Saepe ea commodi minus rem atque nihil.',
    date: '2020-08-29T00:00:00.000Z',
    answerer_name: 'Maryse.OHara',
    helpfulness: 19,
    photos: [ [Object] ]
  },
  {
    answer_id: 3715723,
    body: 'Vitae earum ipsa enim.',
    date: '2021-02-23T00:00:00.000Z',
    answerer_name: 'Giovanna.OConner',
    helpfulness: 17,
    photos: [ [Object] ]
  }
]
// { key: 1, answers: { 3715723: { answerer_name: 'Oje', body: 'Tested and approved', date: '2021-02-23T00:00:00.000Z', helpfulness: 12, id: 3715723, photos: [] } }, asker_name: 'Oje', question_body: 'This test should work', question_helpfulness: 17, question_id: 101501, question_date: '2021-03-31T00:00:00.000Z', reported: false }


const handlers = [
  rest.get('/qa/questions', (req, res, ctx) => {
    return res(
      ctx.json(testResponse)
      )
    })
  // rest.get('/qa/answers', (req, res, ctx) => {
  //   return res(
  //     ctx.json(testResponse)
  //     )
  //   })
      ]

const server = setupServer(rest.get('/qa/questions', (req, res, ctx) => {
    return res(
      ctx.json(testResponse)
      )
    }), rest.get('/qa/answers', (req, res, ctx) => {
      return res(
        ctx.json(testAnswer)
        )
      }))

beforeAll(()=> server.listen())
afterEach(()=> server.resetHandlers())
afterAll(()=> server.close())

xdescribe('QA List', (done) => {
  xtest('Should render the Q/A List', async () => {
    jest.useFakeTimers();
    var app;
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    // act(()=>{
      app = render(
        <Router history={history}>
          <Switch>
            <Route path="/product/:id">
              <QAList />
            </Route>
          </Switch>
        </Router>,
      )
    // })
    setTimeout(()=>{
      // act(()=>{
      //   jest.advanceTimersByTime(1000);
      // })
    // await waitFor(()=>{
      expect(app.container.querySelector("h1[id='QA-heading']")).toBeInTheDocument()
    })
  }, 5000)
  })

  xtest('Should have a search bar', () => {
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

  xtest('Should render a question from the Question component', () => {
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
      expect(app.container.querySelector("div[class='question-body']")).toBeInTheDocument()
    }, 5000)
  })

  xtest('Should render buttons', () => {
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

  xtest('Should render a button to show more answered questions', () => {
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
        expect(app.container.findByText("More Answered Questions")).toBeInTheDocument()
    }, 5000
    )
  })

  xtest('Should render a button to add a question', () => {
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

  xtest('Should render a question from get request', function () {
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
      expect(app.container.querySelector("div[id='question-modal']")).not.toBeInTheDocument()
      const questionModalButton = app.container.querySelector("button[id='add-question']")
      userEvent.click(questionModalButton)
      expect(app.container.querySelector("div[id='question-modal']")).toBeInTheDocument()
  })

  test('Should render a button to show more answered questions', async () => {
    // jest.useFakeTimers()
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
      await act(()=>{
        waitFor(async ()=>{
          expect(await app.container.querySelector("div[class='answer-body']")).toBeInTheDocument()
        })
      })
      // done()
    // }, 5000
    // )
  })


})
