/**
 * @jest-environment jsdom
 */

import React from 'react'
import 'regenerator-runtime/runtime'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import OutfitList from '../../../client/src/components/userOutfits/OutfitList.jsx'

describe('Outfit List', () => {
  test('renders text in Outfit List', () => {
    render(<OutfitList />)
    expect(screen.getByText('OutfitList'))
  })
})
