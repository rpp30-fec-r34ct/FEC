/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, cleanup, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import 'regenerator-runtime/runtime'
import '@testing-library/jest-dom'

import AddCard from '../../../client/src/components/relatedProducts/AddCard.jsx'

afterEach(cleanup)

describe('Add Card', () => {
  test('Add card is rendered', () => {
    render(<AddCard />)
    expect(screen.getByText('Add to Outfit'))
  })

  test('Add button should exist', () => {
    render(<AddCard />)
    expect(screen.getByTestId('add-outfit-button')).toBeInTheDocument()
  })

  test('button captures clicks', async () => {
    const mockCallBack = jest.fn()

    render(<AddCard addOutfit={mockCallBack} />)

    const addButton = screen.getByTestId('add-outfit-button')
    await userEvent.click(addButton)
    expect(mockCallBack).toHaveBeenCalledTimes(1)
  })
})
