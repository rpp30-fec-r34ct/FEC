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
// import testProduct from '../../../testData/testProduct'

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
            <OutfitCard outfit={testRelatedProducts} />
          </Route>
        </Switch>
      </Router>
    )
  })
  test('Should render the outfit category on card', async () => {
    expect(await app.findByTestId(`outfit-category-${testRelatedProducts[1].id}`)).toHaveTextContent('Pants')
  })
  test('Should render the outfit name on card', async () => {
    expect(await app.findByTestId(`outfit-name-${testRelatedProducts[1].id}`)).toHaveTextContent('Morning Joggers')
  })
  test('Should render the outfit price on card', async () => {
    expect(await app.findByTestId(`outfit-price-${testRelatedProducts[1].id}`)).toHaveTextContent('$40.00')
  })
  test('Should not render the sale price on outfit card', async () => {
    expect(await app.findByTestId(`outfit-sale-${testRelatedProducts[1].id}`)).toHaveTextContent('$50.00')
  })
  test('Should render the outfit image on card', () => {
    expect(app.container.querySelector(`[src='${testRelatedProducts[1].photo}']`)).toBeInTheDocument()
  })
})
