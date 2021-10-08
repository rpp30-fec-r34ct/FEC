/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'
import 'regenerator-runtime/runtime'
import '@testing-library/jest-dom'
import { createMemoryHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
import testProduct from '../../../testData/testProduct'
import OutfitList from '../../../client/src/components/relatedProducts/OutfitList.jsx'

let app

describe('Outfit List Component', function () {
  beforeEach(() => {
    const history = createMemoryHistory()
    const route = '/product/47421/carousel'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:productId/carousel/'>
            <OutfitList currentOverview={testProduct} />
          </Route>
        </Switch>
      </Router>
    )
  })
  test('Outfit List should exist', () => {
    expect(app.container.querySelector('.outfit-list')).toBeInTheDocument()
  })
  test('Outfit List should initially have no items', () => {
    expect(app.container.querySelector('.carousel-content').children.length).toEqual(0)
  })
  test('Outfit List should have a header', () => {
    expect(app.container.querySelector('.outfit-list-header-1').innerHTML).toBe('YOUR OUTFIT')
  })
})
