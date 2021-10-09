/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import 'regenerator-runtime/runtime'

import '@testing-library/jest-dom/extend-expect'
import { act } from 'react-dom/test-utils'
import userEvent from '@testing-library/user-event'
import ReviewTile from '../../../client/src/components/Review Widget/ReviewTile.jsx'

let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

const reviewData =
  {
    review_id: 781037,
    rating: 4,
    summary: 'This product was ok!',
    recommend: false,
    response: '',
    body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate',
    date: '2019-01-11T00:00:00.000Z',
    reviewer_name: 'mymainstreammother',
    helpfulness: 13,
    photos: []
  }

// technically this is incorrect, it should only render 2 reviews but putting this test in here now as a skeleton.. i will fix it once i fix the app.
describe('Review Tile Component', () => {
  test('Should include the date in the correct formate', function () {
    render(<ReviewTile reviewData={reviewData} />)
    expect(screen.getByText('January 11, 2019')).toBeInTheDocument()
  })

  // test for presences of show more button
  test('Should have a see more button by default', function () {
    render(<ReviewTile reviewData={reviewData} />)
    const showMoreBtn = screen.getByTestId('testSeeMoreBtn')
    expect(showMoreBtn).toBeInTheDocument()
  })

  test('should add a count to the helpful count when clicked', async () => {
    await act(async () => {
      render(<ReviewTile reviewData={reviewData} />, container)
    })
    const elementToClick = screen.getByText('Yes (13)')
    userEvent.click(elementToClick)
    expect(await screen.getByText('Yes (14)')).toBeInTheDocument()
  })
})
