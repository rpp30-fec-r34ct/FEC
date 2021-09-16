/**
 * @jest-environment jsdom
 */

import React from 'react'
import 'regenerator-runtime/runtime'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import OutfitCard from '../../../client/src/components/userOutfits/OutfitCard.jsx'

describe('Outfit Card', () => {
  test('renders category, name, and price in outfit card', () => {
    render(<OutfitCard />)

    expect(screen.getByText('CATEGORY'))
    expect(screen.getByText('NAME'))
    expect(screen.getByText('$PRICE'))
  })
})
