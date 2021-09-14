/**
 * @jest-environment jsdom
 */

import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import ProductStars from '../../client/src/components/ProductStars.jsx'

describe('Product Stars Component', function () {
  test('Should render the stars', function () {
    const app = render(<ProductStars />)
    expect(app.container.querySelector('#starsOuter')).toBeInTheDocument()
    expect(app.container.querySelectorAll('.fa-star').length).toBe(5)
  })
})
