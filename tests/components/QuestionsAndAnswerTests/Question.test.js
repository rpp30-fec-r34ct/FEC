/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ environment: 'dev', service: 'fakeService', productId: 47421 }),
}))

// components
import Question from '../../../client/src/QAComponents/Question.jsx'

describe('Individual Question Component', () => {
  test('Should render a Question', function () {
    const question = render(<Question />)
    expect(question.container.querySelector("div[class='question-body']")).toBeInTheDocument()
  })
})