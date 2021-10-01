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
 import NewAnswer from '../../../client/src/QAComponents/NewAnswer.jsx'

 xdescribe('Individual Answer Component', () => {
  test('Should render an Answer', function () {
    const answer = render(<NewAnswer />)
    expect(answer.container.querySelector("div[class='answer-body']")).toBeInTheDocument()
  })
})