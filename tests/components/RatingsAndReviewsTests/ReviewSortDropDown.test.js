/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// component
import ReviewSortDropDown from '../../../client/src/components/Review Widget/ReviewSortDropDown.jsx'
const onSortTypeChange = () => {
  console.log('onSortTypeChange called in test')
}

const sortType = 'newest'

describe('ReviewSortDropDown Component Smoke Test', () => {
  test('Should be on the DOM', function () {
    render(<ReviewSortDropDown onSortTypeChange={onSortTypeChange} sortType={sortType} />)

    const ReviewSortDropDownElement = screen.getByTestId('testReviewSortDropDown')
    expect(ReviewSortDropDownElement).toBeInTheDocument()
  })
})
