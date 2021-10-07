/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Comparison from '../../../client/src/components/relatedProducts/Comparison.jsx'

describe('Comparison', () => {
  test('renders Current Item Header in Comparison Modal', () => {
  // const onChange = jest.fn()
    render(<Comparison />)
    // userEvent.dblClick()
    expect(screen.getByText('Current Item'))
  })
})
