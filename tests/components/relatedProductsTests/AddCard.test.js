/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import AddCard from '../../../client/src/components/relatedProducts/AddCard.jsx'

describe('Add Card', () => {
  test('renders text in add card', () => {
    render(<AddCard />)
    expect(screen.getByText('Add to Outfit'))
  })
})
