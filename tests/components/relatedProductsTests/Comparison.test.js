/**
 * @jest-environment jsdom
 */

import React from 'react'
import 'regenerator-runtime/runtime'
import { render, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { createMemoryHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
import testRelatedProducts from '../../../testData/testRelatedProducts'
import testProduct from '../../../testData/testProduct'

import Comparison from '../../../client/src/components/relatedProducts/Comparison.jsx'

let app
const modalRoot = document.createElement('div')
modalRoot.setAttribute('id', 'modal')
document.body.appendChild(modalRoot)

describe('Comparison', () => {
  beforeEach(() => {
    const history = createMemoryHistory()
    const route = '/product/47421/carousel'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:productId/carousel/'>
            <Comparison relatedItem={testRelatedProducts[0]} currentOverview={testProduct} />
          </Route>
        </Switch>
      </Router>
    )

    const favoriteButton = app.getByTestId('rel-product-toggle')
    userEvent.click(favoriteButton)
  })

  test('Should render the Comparing header', async () => {
    expect(await app.findByTestId('comparing-header-modal')).toHaveTextContent('Comparing')
    expect(app.getByText(testProduct.name)).toBeTruthy()
    expect(app.getByText(testRelatedProducts[0].name)).toBeTruthy()
  })

  test('Should close the modal when button is clicked', () => {
    const closeModal = app.getByTestId('toggle-comparison-modal')
    userEvent.click(closeModal)
    expect(app.queryByTestId('comparing-header-modal')).toEqual(null)
  })
  afterEach(cleanup)
})
