/**
 * @jest-environment jsdom
 */

import React from 'react'
import 'regenerator-runtime/runtime'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Comparison from '../../../client/src/components/relatedProducts/Comparison.jsx'

describe('Comparison', () => {
  test('renders Comparison Modal', () => {
    render(<Comparison />)
    expect(screen.getByText('Current Item'))
  })
})
