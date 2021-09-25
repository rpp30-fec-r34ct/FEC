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
 import Answer from '../../../client/src/QAComponents/Answer.jsx'

 describe('Individual Answer Component', () => {
  test('Should render an Answer', function () {
    const answer = render(<Answer />)
    expect(answer.container.querySelector("div[class='answer-body']")).toBeInTheDocument()
  })
})