/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// component
import BarChart from '../../../client/src/components/Review Widget/BarChart.jsx'
const ratings = { 1: '3' }

describe('Bar Chart Component', () => {
  test('Should exist on the dom', function () {
    render(<BarChart breakDownRatings={ratings} totalReviews={9} />)

    const barChartElement = screen.getByTestId('testBarChart')
    expect(barChartElement).toHaveClass('BarChart')
  })
})
