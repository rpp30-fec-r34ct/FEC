/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { createMemoryHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
import testRelatedProducts from '../../../testData/testRelatedProducts'
import testProduct from '../../../testData/testProduct'
import ProductList from '../../../client/src/components/relatedProducts/ProductList.jsx'

describe('Product List Component', () => {
  test('should render list of 4 products ', () => {
    const history = createMemoryHistory()
    const route = '/product/47421/carousel'
    history.push(route)
    const ProductListComponent = render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:productId/carousel/'>
            <ProductList currentIndex={1} relatedProducts={testRelatedProducts} currentOverview={testProduct} />
          </Route>
        </Switch>
      </Router>
    )

    expect(ProductListComponent.container.querySelector('.carousel-content').children.length).toEqual(4)
  })

  test('should render nothing if no products ', () => {
    const history = createMemoryHistory()
    const route = '/product/47421/carousel'
    history.push(route)
    const ProductListComponent = render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:productId/carousel/'>
            <ProductList currentIndex={0} relatedProducts={[]} currentOverview={testProduct} />
          </Route>
        </Switch>
      </Router>
    )

    expect(ProductListComponent.container.querySelector('.carousel-content').children.length).toEqual(0)
  })
})
