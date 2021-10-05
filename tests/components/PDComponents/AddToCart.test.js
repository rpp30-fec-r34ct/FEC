/**
 * @jest-environment jsdom
 */

import React from 'react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import 'regenerator-runtime/runtime'

import AddToCart from '../../../client/src/PDComponents/AddToCart.jsx'

const server = setupServer()

beforeAll(() => { server.listen() })
beforeEach(() => { server.resetHandlers() })
afterAll(() => { server.close() })

const sku = 1665089

const selectedSize = { quantity: 8, size: 'XS' }

describe('Add to Cart Component', function () {
  test('Should render the button if quantity is greater than 0', function () {
    const app = render(
      <AddToCart sku={sku} selectedSize={selectedSize} handleNoSkuClick={() => {}} />
    )
    expect(app.getByText('Cart +')).toBeInTheDocument()
  })

  test('Should NOT render the button if the quantity is 0', function () {
    const app = render(
      <AddToCart sku={sku} selectedSize={{ quantity: 0, size: 'XS' }} handleNoSkuClick={() => {}} />
    )
    expect(app.queryByText('Cart +')).toBeNull()
  })

  test('Should submit the product to the cart when the button is clicked', async function () {
    server.use(
      rest.post('/api/cart', (req, res, ctx) => {
        expect(req.body).toEqual({ sku_id: 1665089 })
        return res(ctx.json('Created'))
      })
    )
    const app = render(
      <AddToCart sku={sku} selectedSize={selectedSize} handleNoSkuClick={() => {}} />
    )
    userEvent.click(app.getByRole('button'))
    const addToCartButton = await app.findByText('✓')
    expect(addToCartButton).toBeInTheDocument()
    expect(addToCartButton.getAttribute('disabled')).toBeTruthy()
  })

  test('Should focus the button if the request fails', async function () {
    server.use(
      rest.post('/api/cart', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    const app = render(
      <AddToCart sku={sku} selectedSize={selectedSize} handleNoSkuClick={() => {}} />
    )
    userEvent.click(app.getByRole('button'))
    const addToCartButton = await app.findByText('Try Again')
    expect(addToCartButton).toBeInTheDocument()
    expect(addToCartButton).toHaveFocus()
  })
})
