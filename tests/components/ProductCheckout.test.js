/**
 * @jest-environment jsdom
 */

import { describe, test, expect } from 'jest'
import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import ProductCheckout from '../../client/src/components/ProductCheckout'

describe('Product Checkout Component', function () {
  test('Should render the checkout buttons', function () {
    const app = render(<ProductCheckout />)
    const buttons = app.getAllByRole('button')
    expect(buttons.length).toBe(2)
    expect(buttons[0].innerHTML).toBe('Add to bag    +')
    expect(buttons[1].innerHTML).toBe('Favorite')
  })

  test('Should render the drop down select', function () {
    const app = render(<ProductCheckout />)
    expect(app.getByRole('option')).toBeInTheDocument()
    expect(app.getByRole('option').innerHTML).toBe('1')
  })
})
