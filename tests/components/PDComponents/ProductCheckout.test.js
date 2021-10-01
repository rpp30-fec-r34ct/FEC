/**
 * @jest-environment jsdom
 */

import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { render, within } from '@testing-library/react'

import ProductCheckout from '../../../client/src/PDComponents/ProductCheckout.jsx'

const productStyleData = {
  style_id: 286894,
  name: 'Forest Green & Black',
  original_price: '140.00',
  sale_price: null,
  'default?': true,
  photos: [
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
    },
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80'
    },
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80'
    },
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
    },
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80'
    }
  ],
  skus: {
    1665053: {
      quantity: 8,
      size: 'XS'
    },
    1665054: {
      quantity: 16,
      size: 'S'
    },
    1665055: {
      quantity: 17,
      size: 'M'
    },
    1665056: {
      quantity: 10,
      size: 'L'
    },
    1665057: {
      quantity: 15,
      size: 'XL'
    },
    1665058: {
      quantity: 4,
      size: 'XL'
    }
  }
}

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
    expect(buttons[0].innerHTML).toBe('Cart +')
    expect(buttons[1].innerHTML).toBe('Favorite')
  })

  test('Should change the foucus to the size selector if unselected and cart button clicked', function () {
    const history = createMemoryHistory()
    history.push('/product/47421')
    const app = render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:productId' exact>
            <ProductCheckout selectedStyle={productStyleData} />
          </Route>
        </Switch>
      </Router>
    )
    const sizeSelector = app.container.querySelector('#style-select')
    const addToCartButton = app.getByText('Cart +')
    expect(sizeSelector).not.toHaveFocus()
    userEvent.click(addToCartButton)
    expect(sizeSelector).toHaveFocus()
  })

  test('Should change the quantity list when a size is selected', function () {
    const history = createMemoryHistory()
    history.push('/product/47421')
    const app = render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:productId' exact>
            <ProductCheckout selectedStyle={productStyleData} />
          </Route>
        </Switch>
      </Router>
    )
    expect(app.getByText('-')).toBeInTheDocument()
    expect(app.getByText('XS')).toBeInTheDocument()
    const sizeSelector = app.container.querySelector('#style-select')
    const quantitySelector = app.container.querySelector('#quantity-select')
    userEvent.click(sizeSelector)
    userEvent.selectOptions(sizeSelector, Object.keys(productStyleData.skus)[0])
    expect(within(quantitySelector).queryByText('-')).toBeNull()
    expect(within(quantitySelector).queryByText('8')).not.toBeNull()
  })

  test('Should add the product to localStorage favorites when favorite is clicked', function () {
    const history = createMemoryHistory()
    history.push('/product/47421')
    const app = render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:productId' exact>
            <ProductCheckout selectedStyle={productStyleData} />
          </Route>
        </Switch>
      </Router>
    )
    const favoriteButton = app.getByText('Favorite')
    expect(window.localStorage.getItem('FECOutfit')).toBeNull()
    userEvent.click(favoriteButton)
    expect(window.localStorage.getItem('FECOutfit')).toBe('[47421]')
    // should not add it more than once
    userEvent.click(favoriteButton)
    userEvent.click(favoriteButton)
    userEvent.click(favoriteButton)
    expect(window.localStorage.getItem('FECOutfit')).toBe('[47421]')
  })
})
