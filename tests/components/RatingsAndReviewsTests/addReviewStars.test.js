/**
 * @jest-environment jsdom
 */

 import React from 'react'
 import { render, screen } from '@testing-library/react'
 import '@testing-library/jest-dom'
//  import userEvent from '@testing-library/user-event'
//  import 'regenerator-runtime/runtime'

import helpers from '../../../client/src/components/Shared/helpers.js'
import AddReviewStars from '../../../client/src/components/Review Widget/AddReview/AddReviewStars.jsx'
const ratings = { 1: '3' }

describe('Add Review Stars Component', () => {
  test('Should exist on the dom', function () {
    render(<AddReviewStars />)

    const stars = screen.getByTestId('testAddReviewStarsOutput')
    expect(stars).toBeInTheDocument()

    const rating = helpers.getFormStarRating();
    expect(rating).toBe('')
  })

  test('Should return the correct rating ', function () {
    render(<AddReviewStars />)
    const rating = helpers.getFormStarRating();
    expect(rating).toBe('')
  })
})




