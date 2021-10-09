/**
 * @jest-environment jsdom
 */

import React from 'react'
import 'regenerator-runtime/runtime'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { createMemoryHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import testRelatedProducts from '../../../testData/testRelatedProducts.js'

import Carousel from '../../../client/src/components/relatedProducts/Carousel.jsx'

// setup worker
const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Carousel', () => {
  test.each(testRelatedProducts)('Renders Carousel Correctly', async function () {
    server.use(
      rest.get('/product/47421/related', (req, res, ctx) => {
        return res(ctx.json(testRelatedProducts))
      })
    )
    const history = createMemoryHistory()
    const route = '/product/47421/carousel'
    history.push(route)
    const app = render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:productId/carousel/'>
            <Carousel />
          </Route>
        </Switch>
      </Router>
    )
    expect(await app.findByTestId('rel-product-header')).toHaveTextContent('RELATED PRODUCTS')
    expect(await app.findByTestId('rel-product-carousel')).toBeInTheDocument()
  })
})
