/**
 * @jest-environment jsdom
 */

import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import ProductDetailPriceComponent from '../../client/src/components/ProductDetailPrice'

const defaultStyleData = {
  default_price: 100,
  sale_price: null
}

const saleStyleData = {
  default_price: 100,
  sale_price: 80
}

describe('Product Price Component', function () {
  test('Should render the default price for a product style', function () {
    const app = render(<ProductDetailPriceComponent selectedStyle={defaultStyleData} />)
    expect(app.getByText('$100')).toBeInTheDocument()
  })

  test('Should render the sale price if available', function () {
    const app = render(<ProductDetailPriceComponent selectedStyle={saleStyleData} />)
    expect(app.getByText('$80')).toBeInTheDocument()
    expect(app.getByText('$100').closest('strike')).toBeInTheDocument()
  })
})
