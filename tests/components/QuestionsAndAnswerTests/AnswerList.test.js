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
 import AnswerList from '../../../client/src/QAComponents/AnswerList.jsx'

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
         3715723: { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png'] },
         3715724: { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png'] }
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
         1234567: { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: ['='] }
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
         3715682: { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png'] },
         3715684: { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png'] },
         3715685: { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png'] },
         3715686: { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png'] },
         3715687: { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png'] },
         3715688: { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png'] },
         3715689: { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png'] },
         3715690: { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png'] },
         3715691: { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png'] },
         3715693: { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png'] },
         3715694: { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png'] },
         3715695: { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png'] },
         3715696: { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png'] },
         3715697: { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png'] }
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
         1234567: { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png'] }
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
         1234567: { id: 0, body: '0', date: '0', answerer_name: '-', helpfulness: 0, photos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png'] }
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
     photos: [[Object]]
   },
   {
     answer_id: 3715723,
     body: 'Vitae earum ipsa enim.',
     date: '2021-02-23T00:00:00.000Z',
     answerer_name: 'Giovanna.OConner',
     helpfulness: 17,
     photos: [[Object]]
   },
   {
     answer_id: 3715729,
     body: 'Vitae earum ipsa enim.',
     date: '2021-02-23T00:00:00.000Z',
     answerer_name: 'Seller',
     helpfulness: 17,
     photos: [[Object]]
   },
   {
     answer_id: 3715725,
     body: 'Vitae earum ipsa enim.',
     date: '2021-02-23T00:00:00.000Z',
     answerer_name: 'Giovanna.OConner',
     helpfulness: 17,
     photos: [[Object]]
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
       ctx.json(testAnswer)
       )
     })
 ]

 const server = setupServer(
   rest.get('/qa/questions', (req, res, ctx) => {
   return res(
     ctx.json(testResponse)
     )
   })
   , rest.get('/qa/answers', (req, res, ctx) => {
     return res(
     ctx.json(testAnswer)
   )
 })
 )

 beforeAll(() => server.listen())
 afterEach(() => server.resetHandlers())
 afterAll(() => server.close())

 describe('Answer List', () => {
   test('Should include a button to render more than two answers', () => {
     let app
     const history = createMemoryHistory()
     const route = '/product/47421'
     history.push(route)
     // act(()=>{
     app = render(
       <Router history={history}>
         <Switch>
           <Route path='/product/:id'>
             <AnswerList id={396966} updateAnswers={false}/>
           </Route>
         </Switch>
       </Router>
     )
     setTimeout(() => {
      expect(app.container.querySelector("a[id='get-more-answers']")).toBeInTheDocument()
     }, 1000)
   })
   test('Should Collapse Answers down to two', () => {
     let app
     const history = createMemoryHistory()
     const route = '/product/47421'
     history.push(route)
     // act(()=>{
     app = render(
       <Router history={history}>
         <Switch>
           <Route path='/product/:id'>
             <AnswerList id={396966} updateAnswers={false}/>
           </Route>
         </Switch>
       </Router>
     )
     const button = app.container.querySelector("a[id='get-more-answers']")
     setTimeout(async () => {
       fireEvent.click(button)
       await expect(app.container.querySelector("a[id='get-more-answers']").innerHTML).toEqual('See More Answers')
     }, 1000)
   })
   test('Should have the seller first', async () => {
     let app
     const history = createMemoryHistory()
     const route = '/product/47421'
     history.push(route)
     app = render(
       <Router history={history}>
         <Switch>
           <Route path='/product/:id'>
             <AnswerList id={396966} updateAnswers={false}/>
           </Route>
         </Switch>
       </Router>
     )
      const answers = app.container.getElementsByClassName('answer-body')
      console.log(answers)
      setTimeout(()=>{
        expect(answers[0].answerer_name).toEqual('Seller')
      }, 10)
   })
   test('Should Mark an Answer Helpful', function () {
    let app
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:id'>
            <AnswerList id={396966} updateAnswers={false}/>
          </Route>
        </Switch>
      </Router>
    )
    setTimeout(()=>{
      const helpfulLink = app.container.querySelector("a[class='helpful-answer']")
      let helpfulness = app.container.querySelector("span[id='answer-helpfulness']")
      expect(helpfulness.innerHTML).toEqual('0')
      async () => {
        fireEvent.click(helpfulLink)
        await expect(helpfulness.innerHTML).toEqual('1')
      }
    }, 1000)
  })
 })
