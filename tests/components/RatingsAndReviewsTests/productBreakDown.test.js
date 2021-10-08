/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// component
import ProductBreakdown from '../../../client/src/components/Review Widget/ProductBreakdown.jsx'

const data = {
  Fit: 2.4
}

describe('Product Breakdown Component', () => {
  test('Should be on the DOM', function () {
    render(<ProductBreakdown characteristicsData={data} />)

    const productBreakDownElem = screen.getByTestId('testProductBreakdown')
    expect(productBreakDownElem).toBeInTheDocument()
  })

  test('Should have a product breakdown bar', function () {
    render(<ProductBreakdown characteristicsData={data} />)

    const productBreakDownBar = screen.getByTestId('testProductBreakdownBar')
    expect(productBreakDownBar).toHaveClass('productBreakDownBar')
  })

  test('Should have the correct middle limit for the given characteristic', function () {
    render(<ProductBreakdown characteristicsData={data} />)
    expect(screen.getByText('Perfect')).toBeInTheDocument()
  })

  test('Should have the correct lower limit for the given characteristic', function () {
    render(<ProductBreakdown characteristicsData={data} />)
    expect(screen.getByText('Runs tight')).toBeInTheDocument()
  })

  test('Should have the correct upper limit for the given characteristic', function () {
    render(<ProductBreakdown characteristicsData={data} />)
    expect(screen.getByText('Runs long')).toBeInTheDocument()
  })

})
