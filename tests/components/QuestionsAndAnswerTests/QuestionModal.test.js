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
import QuestionModal from '../../../client/src/QAComponents/QuestionModal.jsx'

describe('Individual Question Component', () => {
  test('Should NOT render by default', function () {
    const modal = render(<QuestionModal />)
    expect(modal.queryByText('Product')).toBeNull()
  })

  test('Should render if props.showQuestionModal is true', function () {
    const modal = render(<QuestionModal showQuestionModal={true}/>)
    expect(modal.getByText('Product')).toBeInTheDocument()
  })

  test('Should render a form', function () {
    const modal = render(<QuestionModal showQuestionModal={true}/>)
    expect(modal.container.querySelector("div[class='add-question-form']")).toBeInTheDocument()
  })

  test('Should render a form with an input for the question', function () {
    const modal = render(<QuestionModal showQuestionModal={true}/>)
    expect(modal.container.querySelector("input[name='question']")).toBeInTheDocument()
  })

  test('Should render a form with an input for the nickname of the asker', function () {
    const modal = render(<QuestionModal showQuestionModal={true}/>)
    expect(modal.container.querySelector("input[name='nickname']")).toBeInTheDocument()
  })

  test('Should render a form with an input for the email address of the asker', function () {
    const modal = render(<QuestionModal showQuestionModal={true}/>)
    expect(modal.container.querySelector("input[name='email']")).toBeInTheDocument()
  })
})