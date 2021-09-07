/**
 * @jest-environment jsdom
 */

import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

// components
import App from '../../client/src/index.jsx';

describe('Index App', () => {
  test('Should render the app title', () => {
    render(<App/>);
    expect(screen.getByText('PROJECT ATLIER')).toBeInTheDocument()
  });
});