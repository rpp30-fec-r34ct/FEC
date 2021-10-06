/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import testRelatedProducts from '../../../testData/testRelatedProducts'
import ProductList from '../../../client/src/components/relatedProducts/ProductList.jsx'

describe('Product List Component', () => {
  test('should render list of 4 products ', () => {
    const ProductListComponent = render(<ProductList product={testRelatedProducts} />)
    expect(ProductListComponent.container.querySelector('.product-list')).toBeInTheDocument()
  })
})
