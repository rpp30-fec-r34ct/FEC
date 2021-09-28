/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// component
import ReviewMetaData from '../../../client/src/components/ReviewWidget/ReviewMetaData.jsx'
const productId = 47421

describe('Review Meta Data Component', () => {
  test('Should render the review percentage element', function () {
    render(<ReviewMetaData product_id={productId} />)

    const percentElement = screen.getByTestId('testPercent')
    expect(percentElement).toHaveClass('percentRecommend')
  })
  // failig due to network issue - need to look into this furhter. i need to simulate the axios request for data but i'm not there yet.
  // test('Should render the average element', function () {
  //   render(<ReviewMetaData product_id={productId} />)

  //   const averageElement = screen.getByTestId('testAverage')
  //   expect(averageElement).toHaveClass('ratingItem')
  // })
})
