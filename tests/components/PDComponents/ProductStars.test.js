/**
 * @jest-environment jsdom
 */

import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import ProductStars from '../../../client/src/PDComponents/ProductStars.jsx'

describe('Product Stars Component', function () {
  test('Should render the stars', function () {
    const app = render(<ProductStars />)
    expect(app.container.querySelector('#starsOuter')).toBeInTheDocument()
    expect(app.container.querySelector('#starsInner')).toBeInTheDocument()
    expect(app.container.querySelectorAll('.fa-star').length).toBe(10)
  })

  test('Should render the correct inner color width based on the review', function () {
    const app = render(<ProductStars rating={4.3} />)
    const expectedRaitingRounded = Math.round((4.3 * 4) / 4)
    const expectedRaitingPercentage = (expectedRaitingRounded / 5) * 100
    expect(app.container.querySelector('#starsInner').style.width).toBe(`${expectedRaitingPercentage}%`)
  })
})
