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
 import AnswerModal from '../../../client/src/QAComponents/AnswerModal.jsx'
 import QAList from '../../../client/src/QAComponents/QAList.jsx'
 import Question from '../../../client/src/QAComponents/Question.jsx'

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
    photos: [ 'https://5qcentral.com/wp-content/uploads/2018/12/tests.png' ]
  },
  {
    answer_id: 3715723,
    body: 'Vitae earum ipsa enim.',
    date: '2021-02-23T00:00:00.000Z',
    answerer_name: 'Giovanna.OConner',
    helpfulness: 17,
    photos: [ 'https://5qcentral.com/wp-content/uploads/2018/12/tests.png' ]
  }
]
// { key: 1, answers: { 3715723: { answerer_name: 'Oje', body: 'Tested and approved', date: '2021-02-23T00:00:00.000Z', helpfulness: 12, id: 3715723, photos: [] } }, asker_name: 'Oje', question_body: 'This test should work', question_helpfulness: 17, question_id: 101501, question_date: '2021-03-31T00:00:00.000Z', reported: false }


const handlers = [
  rest.get('/qa/questions', (req, res, ctx) => {
    return res(
      ctx.json(testResponse)
      )
    }),
  rest.get('/qa/answers', (req, res, ctx) => {
    return res(
      ctx.json(testResponse)
      )
    })
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

 describe('Individual Question Component', () => {
   test('Should have a heading for the product', function () {
    var app;
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:id'>
            <AnswerModal />
          </Route>
        </Switch>
      </Router>
    )
     expect(app.container.querySelector("h1[id='answerModal-product']")).toBeInTheDocument()
   })

   test('Should NOT render if props.showModal is false', function () {
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
     expect(app.container.querySelector("div[id='answer-modal']")).not.toBeInTheDocument()
   })

   test('Should render if props.showModal is true', function () {
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
   })

   test('Should allow a user to input a name of the answerer', function () {
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
    const form = app.container.querySelector("input[name='answer']")
    fireEvent.change(form, {target: {value: 'Test'}})
    expect(form.value).toBe('Test')
  })

  test('Should allow a user to input an email address', function () {
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
    const form = app.container.querySelector("input[name='email']")
    fireEvent.change(form, {target: {value: 'Tester@test.com'}})
    expect(form.value).toBe('Tester@test.com')
  })

  test('Should allow a user to input a name of the answerer', function () {
    var app;
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:id'>
            <AnswerModal />
          </Route>
        </Switch>
      </Router>
    )
    const form = app.container.querySelector("input[name='nickname']")
    fireEvent.change(form, {target: {value: 'Tester'}})
    expect(form.value).toBe('Tester')
   })

   test('Should render a form', function () {
    var app;
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:id'>
            <AnswerModal />
          </Route>
        </Switch>
      </Router>
    )
    expect(app.container.querySelector("div[class='add-answer-form']")).toBeInTheDocument()
  })

   test('Should render a form with an input for the answer', function () {
    var app;
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:id'>
            <AnswerModal />
          </Route>
        </Switch>
      </Router>
    )
    expect(app.container.querySelector("input[name='answer']")).toBeInTheDocument()
  })

   test('Should render a form with an input for the nickname of the answerer', function () {
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

   test('Should render a form with an input for the email address of the answerer', function () {
    var app;
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:id'>
            <AnswerModal />
          </Route>
        </Switch>
      </Router>
    )
    expect(app.container.querySelector("input[name='email']")).toBeInTheDocument()
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

   test('Should cause an error if user fails to enter a valid email address', async function () {
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
    //  fireEvent.change(app.container.querySelector("input[name='answer']"), {target: {value: 'Tester'}})
    //  fireEvent.change(app.container.querySelector("input[name='nickname']"), {target: {value: 'Tester'}})
    //  fireEvent.change(app.container.querySelector("input[name='email']"), {target: {value: 'Tester'}})
     await fireEvent.submit(app.container.querySelector("form[id='answer-form']"), {target: [
       { value: 'tester'}, { value: 'tester'}, { value: 'tester'}
     ]})
     await expect(app.container.querySelector("div[id='answer-modal']").innerHTML).toContain('Please enter a valid email address\n\n')

    })
   test('Should cause an error if user fails to enter a value for each input of the form', async function () {
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
    //  fireEvent.change(app.container.querySelector("input[name='answer']"), {target: {value: 'Tester'}})
    //  fireEvent.change(app.container.querySelector("input[name='nickname']"), {target: {value: 'Tester'}})
    //  fireEvent.change(app.container.querySelector("input[name='email']"), {target: {value: 'Tester'}})
     await fireEvent.submit(app.container.querySelector("form[id='answer-form']"), {target: [
       { value: null }, { value: null }, { value: null }
     ]})
     await expect(app.container.querySelector("div[id='answer-modal']").innerHTML).toContain('Your answer could not be processed. You must enter ALL of the following: \n Your Answer, \n Your Nickname, and \n Your Email Address \n\n')

    })

    test('Modal should close upon submitting', async function () {
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
     //  fireEvent.change(app.container.querySelector("input[name='answer']"), {target: {value: 'Tester'}})
     //  fireEvent.change(app.container.querySelector("input[name='nickname']"), {target: {value: 'Tester'}})
     //  fireEvent.change(app.container.querySelector("input[name='email']"), {target: {value: 'Tester'}})
      await fireEvent.submit(app.container.querySelector("form[id='answer-form']"), {target: [
        { value: 'null' }, { value: 'null' }, { value: 'null@email.com' }
      ]})
      await setTimeout(()=>{
        expect(app.container.querySelector("div[id='answer-modal']")).not.toBeInTheDocument()
      }, 1000)

     })
    test('Modal should close upon submitting', async function () {
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
      const documentIntial = { content: 'aaa' };
      global.URL.createObjectURL = jest.fn();

      fireEvent.change(app.container.querySelector("input[name='myFile']"), {
        target: {
          files: [new File(['(⌐□_□)'], 'chucknorris.png', {type: 'image/png'})]
        }
      })
      expect(app.container.querySelector("img[class='answer-image']")).toBeInTheDocument()
     })
})
