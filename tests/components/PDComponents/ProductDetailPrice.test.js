/**
 * @jest-environment jsdom
 */

import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import ProductDetailPrice from '../../../client/src/PDComponents/ProductDetailPrice'

describe('Price Component', function () {
  test('Should render the default price if no sale price present', function () {
    const app = render(<ProductDetailPrice selectedStyle={{ default_price: 100, sales_price: null }} />)
    expect(app.getByText('$100')).toBeInTheDocument()
  })

  test('Should render the sale price if presant', function () {
    const app = render(<ProductDetailPrice selectedStyle={{ default_price: 100, sales_price: 80 }} />)
    expect(app.getByText('$80')).toBeInTheDocument()
  })

  test('Should strike out the default price if a sales price is preseant', function () {
    const app = render(<ProductDetailPrice selectedStyle={{ default_price: 100, sales_price: 80 }} />)
    expect(app.container.querySelector('strike').innerHTML).toBe('$100')
  })
})
