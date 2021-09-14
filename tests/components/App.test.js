/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

// components
import App from '../../client/src/components/App.jsx'

describe('App', () => {
  test('Should render the App title', function () {
    const app = render(<App />)
    expect(app.getByText('PROJECT ATLIER')).toBeInTheDocument()
  })
})
