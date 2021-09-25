/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import ReviewTile from '../../../client/src/components/Review Widget/ReviewTile.jsx'
const reviewData =
  {
    review_id: 781037,
    rating: 4,
    summary: 'This product was ok!',
    recommend: false,
    response: '',
    body: 'I really did not like this product solely because I am tiny and do not fit into it.',
    date: '2019-01-11T00:00:00.000Z',
    reviewer_name: 'mymainstreammother',
    helpfulness: 13,
    photos: []
  }

// technically this is incorrect, it should only render 2 reviews but putting this test in here now as a skeleton.. i will fix it once i fix the app.
describe('Review Tile Component', () => {
  test('Should include the date in the correct formate', function () {
    render(<ReviewTile reviewData={reviewData} />)

    // const reviewTileDate = screen.getByTestId('testReviewTileDate')

    // expect(reviewTileDate.innerText).toBe('January 11, 2019')
    expect(screen.getByText('January 11, 2019')).toBeInTheDocument()
  })
})
