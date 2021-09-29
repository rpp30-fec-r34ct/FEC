/**
 * @jest-environment jsdom
 */

import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import ProductDetailFooter from '../../../client/src/PDComponents/ProductDetailFooter'

const productResponse = {
  id: 47421,
  campus: 'hr-rpp',
  name: 'Camo Onesie',
  slogan: 'Blend in to your crowd',
  description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
  category: 'Jackets',
  default_price: '140.00',
  created_at: '2021-08-26T20:30:48.129Z',
  updated_at: '2021-08-26T20:30:48.129Z',
  features: [
    {
      feature: 'Fabric',
      value: 'Canvas'
    },
    {
      feature: 'Buttons',
      value: 'Brass'
    }
  ]
}

describe('Product Detail Footer Component', function () {
  test('Should render the product description', function () {
    const app = render(<ProductDetailFooter productDetails={productResponse} />)
    expect(app.getByText(productResponse.description)).toBeInTheDocument()
  })

  test('Should have the features rendered', function () {
    const app = render(<ProductDetailFooter productDetails={productResponse} />)
    productResponse.features.forEach(item => {
      expect(app.getByText(`${item.feature} : ${item.value}`)).toBeInTheDocument()
    })
  })
})
