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
import NewAnswer from '../../../client/src/QAComponents/NewAnswer.jsx'

describe('Individual Answer Component', () => {
  test('Should render an Answer', function () {
    const answer = render(<NewAnswer />)
    expect(answer.container.querySelector("div[class='answer-body']")).toBeInTheDocument()
  })
  test('Should Report an Answer', function () {
    const answer = render(<NewAnswer />)
    const button = answer.container.querySelector("a[id='report-answer-link']")
    async () => {
      fireEvent.click(button)
      await expect(answer.container.querySelector("td[class='report-answer']").innerHTML).toEqual('Reported')
    }
  })
  test('Should Mark an Answer Helpful', function () {
    const answer = render(<NewAnswer />)
    const helpfulLink = answer.container.querySelector("a[class='helpful-answer']")
    let helpfulness = answer.container.querySelector("span[id='answer-helpfulness']")
    expect(helpfulness.innerHTML).toEqual('0')
    async () => {
      fireEvent.click(helpfulLink)
      await expect(helpfulness.innerHTML).toEqual('1')
    }
  })
  test('Should Render an image', function () {
    const answer = render(<NewAnswer
      id={123456}
      key={1234567}
      body={'This is a test'}
      name={'Oje'}
      photos={['https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png']}
      month={'June'}
      day={'2'}
      year={'2021'}
      helpfulness={0}
    />)
    expect(answer.container.querySelector("img[class='rendered-answer-img']")).toBeInTheDocument()
  })
  test('Should NOT Render an image', function () {
    const answer = render(<NewAnswer />)
    expect(answer.container.querySelector("img[class='rendered-answer-img']")).not.toBeInTheDocument()
  })
  test('Only the name of Seller should be bold', function () {
    const answer = render(<NewAnswer
      id={123456}
      key={1234567}
      body={'This is a test'}
      name={'Oje'}
      photos={['https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png']}
      month={'June'}
      day={'2'}
      year={'2021'}
      helpfulness={0}
    />)
    expect(answer.container.querySelector("b")).not.toBeInTheDocument()
  })
  test('Only the name of Seller should be bold', function () {
    const answer = render(<NewAnswer
      id={123456}
      key={1234567}
      body={'This is a test'}
      name={'Seller'}
      photos={['https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png']}
      month={'June'}
      day={'2'}
      year={'2021'}
      helpfulness={0}
    />)
    expect(answer.container.querySelector("b")).toBeInTheDocument()
  })
})
