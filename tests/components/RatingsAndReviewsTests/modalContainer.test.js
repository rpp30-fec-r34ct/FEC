/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// component
import ModalContainer from '../../../client/src/components/Review Widget/ModalContainer.jsx'
const url = 'https://images.unsplash.com/photo-1560829675-11dec1d78930?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80'

describe('Modal Component Smoke Test', () => {
  test('Should be on the DOM', function () {
    render(<ModalContainer activeModal={url} />)

    const ModalContainerElement = screen.getByTestId('testModalContainer')
    expect(ModalContainerElement).toBeInTheDocument()
  })
})
