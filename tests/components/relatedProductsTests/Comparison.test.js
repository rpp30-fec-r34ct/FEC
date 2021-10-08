/**
 * @jest-environment jsdom
 */

import React from 'react'
import 'regenerator-runtime/runtime'
import { render } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { createMemoryHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
import testRelatedProducts from '../../../testData/testRelatedProducts'
import testProduct from '../../../testData/testProduct'

import Comparison from '../../../client/src/components/relatedProducts/Comparison.jsx'

let app
describe('Comparison', () => {
  beforeEach(() => {
    const history = createMemoryHistory()
    const route = '/product/47421/carousel'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:productId/carousel/'>
            <Comparison relatedProducts={testRelatedProducts} currentOverview={testProduct} />
          </Route>
        </Switch>
      </Router>
    )
  })
  test('Should render the Comparing header', async () => {
    expect(await app.findByTestId('comparing-header-modal')).toHaveTextContent('Comparing')
  })
})
