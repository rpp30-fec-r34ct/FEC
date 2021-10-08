/**
 * @jest-environment jsdom
 */

import React from 'react'
import 'regenerator-runtime/runtime'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { createMemoryHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
import OutfitCard from '../../../client/src/components/relatedProducts/OutfitCard.jsx'
import testProduct from '../../../testData/testProduct'
import userEvent from '@testing-library/user-event'

afterEach(cleanup)

let app
const mockCallBack = jest.fn()

describe('Outfit Cards', function () {
  beforeEach(() => {
    const history = createMemoryHistory()
    const route = '/product/47421/carousel'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:productId/carousel/'>
            <OutfitCard deleteOutfit={mockCallBack} outfit={testProduct} />
          </Route>
        </Switch>
      </Router>
    )
  })

  test('button captures clicks', async () => {
    const deleteButton = app.getByTestId('delete-outfit-btn')
    await userEvent.click(deleteButton)

    expect(mockCallBack).toHaveBeenCalledTimes(1)
  })

  test('Should render the category on outfit card', async () => {
    expect(await app.findByTestId(`outfit-category-${testProduct.id}`)).toHaveTextContent('Jackets')
  })

  test('Should render the correct rating stars out of 5 stars on outfit card', () => {
    const fullStarRatings = app.queryAllByTestId('full-star-img')
    const quarterStarRatings = app.queryAllByTestId('quarter-star-img')
    const halfStarRatings = app.queryAllByTestId('half-star-img')
    const threeQuarterStarRatings = app.queryAllByTestId('three-quarter-star-img')
    const emptyStarRatings = app.queryAllByTestId('empty-star-img')

    expect(fullStarRatings.length).toEqual(3)
    expect(quarterStarRatings.length).toEqual(1)
    expect(halfStarRatings.length).toBe(0)
    expect(threeQuarterStarRatings.length).toBe(0)
    expect(emptyStarRatings.length).toEqual(5)
  })
})
