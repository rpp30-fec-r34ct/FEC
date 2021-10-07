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
import NewAnswer from '../../../client/src/QAComponents/NewAnswer.jsx'

<<<<<<< HEAD
 // components
 import NewAnswer from '../../../client/src/QAComponents/NewAnswer.jsx'

 xdescribe('Individual Answer Component', () => {
=======
describe('Individual Answer Component', () => {
>>>>>>> 56c7017145e89bd1fd8c2ff622ab3adb84c60f10
  test('Should render an Answer', function () {
    const answer = render(<NewAnswer />)
    expect(answer.container.querySelector("div[class='answer-body']")).toBeInTheDocument()
  })
})
