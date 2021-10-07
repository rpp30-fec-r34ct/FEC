/**
 * @jest-environment jsdom
 */

import React from 'react'
import 'regenerator-runtime/runtime'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import testRelatedProducts from '../../../testData/testRelatedProducts'
import ProductCard from '../../../client/src/components/relatedProducts/ProductCard.jsx'

describe('Product Cards', function () {
  test('Should render the related product categories on cards', function () {
    const app = render(<ProductCard product={testRelatedProducts[0]} />)
    expect(app.getByText(testRelatedProducts[0].category)).toBeInTheDocument()
  })
  test('Should render the related product names on cards', function () {
    const app = render(<ProductCard product={testRelatedProducts[0]} />)
    expect(app.getByText(testRelatedProducts[0].name)).toBeInTheDocument()
  })
  // test('Should render the related product prices on cards', function () {
  //   const app = render(<ProductCard product={testRelatedProducts[0]} />)
  //   expect(app.getByText(`$${testRelatedProducts[0].price}`)).toBeInTheDocument()
  // })
  // test('Should render the related product categories on cards', function () {
  //   const app = render(<ProductCard product={testRelatedProducts[0]} />)
  //   expect(app.getByText(testRelatedProducts[0].sale)).toBeInTheDocument()
  // })
  test('Should render the related product images on cards', function () {
    const app = render(<ProductCard product={testRelatedProducts[0]} />)
    expect(app.container.querySelector(`[src='${testRelatedProducts[0].photo}']`)).toBeInTheDocument()
  })
})
