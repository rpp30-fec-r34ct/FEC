/**
 * @jest-environment jsdom
 */

import React from 'react'
import 'regenerator-runtime/runtime'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { createMemoryHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
import testRelatedProducts from '../../../testData/testRelatedProducts'
import OutfitCard from '../../../client/src/components/relatedProducts/OutfitCard.jsx'
import testProduct from '../../../testData/testProduct'


let app

describe('Outfit Cards', function () {
  beforeEach(() => {
    const history = createMemoryHistory()
    const route = '/product/47421/carousel'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:productId/carousel/'>
            <OutfitCard deleteOutfit={testRelatedProducts[0]} outfit={testRelatedProducts} />
          </Route>
        </Switch>
      </Router>
    )
  })
  test('Should render the related product category on card', async () => {
    expect(await app.findByTestId(`rel-product-category-${testRelatedProducts[0].id}`)).toHaveTextContent('Accessories')
  })
  test('Should render the related product name on card', async () => {
    expect(await app.findByTestId(`rel-product-name-${testRelatedProducts[0].id}`)).toHaveTextContent('Bright Future Sunglasses')
  })
  test('Should render the related product price on card', async () => {
    expect(await app.findByTestId(`rel-product-price-${testRelatedProducts[0].id}`)).toHaveTextContent('$69.00')
  })
  test('Should render the related product category on card', async () => {
    expect(await app.findByTestId(`rel-product-sale-${testRelatedProducts[0].id}`)).toHaveTextContent('$50.00')
  })
  test('Should render the related product image on card', () => {
    expect(app.container.querySelector(`[src='${testRelatedProducts[0].photo}']`)).toBeInTheDocument()
  })
})