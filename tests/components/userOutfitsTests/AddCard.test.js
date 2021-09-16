/**
 * @jest-environment jsdom
 */

import React from 'react'
import 'regenerator-runtime/runtime'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import AddCard from '../../../client/src/components/userOutfits/AddCard.jsx'

describe('Outfit Card', () => {
  test('renders text in add card', () => {
    render(<AddCard />)
    expect(screen.getByText('Add to Outfit'))
  })
})
