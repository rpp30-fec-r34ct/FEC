/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// component
import ReviewStars from '../../client/src/components/Review Widget/ReviewStars.jsx'
const average = 5

describe('Review Stars Component', () => {
  test('Should render 5 stars regardless of the rating', function () {
    render(<ReviewStars starRating={average} review_id={average} />)

    const starElement = screen.getByTestId('testReviewStars')
    // console.log(starElement);
    expect(starElement.childElementCount).toBe(5)
  })
})
