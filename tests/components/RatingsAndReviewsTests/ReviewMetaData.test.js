/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// component
import ReviewMetaData from '../../../client/src/components/Review Widget/ReviewMetaData.jsx'
const metaData = {
  ratings: {
    2: 1,
    4: 1,
    5: 2
  },
  recommended: {
    false: 1,
    true: 3
  },
  product_id: 47421
}

describe('Review Meta Data Component', () => {
  test('Should render the review percentage element', function () {
    render(<ReviewMetaData metaData={metaData} />)

    const percentElement = screen.getByTestId('testPercent')
    expect(percentElement).toHaveClass('percentRecommend')
  })
})
