/**
 * @jest-environment jsdom
 */

import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import ProductCheckout from '../../../client/src/PDComponents/ProductCheckout'

describe('Product Checkout Component', function () {
  test('Should render the checkout buttons', function () {
    const history = createMemoryHistory()
    history.push('/product/47421')
    const app = render(
      <Router history={history}>
          <Switch>
          <Route path='/product/:productId' exact>
            <ProductCheckout />
          </Route>
        </Switch>
      </Router>
    )
    const buttons = app.getAllByRole('button')
    expect(buttons.length).toBe(2)
    expect(buttons[0].innerHTML).toBe('Add to bag    +')
    expect(buttons[1].innerHTML).toBe('Favorite')
  })

  test('Should render the drop down select', function () {
    const history = createMemoryHistory()
    history.push('/product/47421')
    const app = render(
      <Router history={history}>
          <Switch>
          <Route path='/product/:productId' exact>
            <ProductCheckout />
          </Route>
        </Switch>
      </Router>
    )
    expect(app.getByRole('option')).toBeInTheDocument()
    expect(app.getByRole('option').innerHTML).toBe('1')
  })
})
