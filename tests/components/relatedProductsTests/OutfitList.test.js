/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import OutfitList from '../../../client/src/components/relatedProducts/OutfitList.jsx'

describe('Outfit List Component', () => {
  test('should find existing div in Outfit List Component ', () => {
    const OutfitListComponent = render(<OutfitList />)
    expect(OutfitListComponent.container.querySelector('.outfit-list')).toBeInTheDocument()
  })
})
