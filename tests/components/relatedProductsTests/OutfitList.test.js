/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import testProduct from '../../../testData/testProduct'
import OutfitList from '../../../client/src/components/relatedProducts/OutfitList.jsx'

describe('Outfit List Component', () => {
  test('outfit list should exist', () => {
    const OutfitListComponent = render(<OutfitList currentOverview={testProduct} />)
    expect(OutfitListComponent.container.querySelector('.outfit-list')).toBeInTheDocument()
  })
  test('should render list of 0 products ', () => {
    const OutfitListComponent = render(<OutfitList currentOverview={testProduct} />)
    expect(OutfitListComponent.container.querySelector('.carousel-content').children.length).toEqual(0)
  })
})
