/**
 * @jest-environment jsdom
 */

import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import StyleSelectorItem from '../../client/src/components/StyleSelectorItem.jsx'

const styleData = {
  style_id: 286895,
  name: 'Desert Brown & Tan',
  original_price: '140.00',
  sale_price: null,
  'default?': false,
  photos: [
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1533779183510-8f55a55f15c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1533779183510-8f55a55f15c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
    },
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1560567546-4c6dbc16877b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1560567546-4c6dbc16877b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
    },
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1458253329476-1ebb8593a652?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1458253329476-1ebb8593a652?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
    },
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1422557379185-474fa15bf770?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1422557379185-474fa15bf770?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
    },
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1490723286627-4b66e6b2882a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1490723286627-4b66e6b2882a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
    },
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1447958272669-9c562446304f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1447958272669-9c562446304f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2800&q=80'
    }
  ],
  skus: {
    1665059: {
      quantity: 8,
      size: 'XS'
    },
    1665060: {
      quantity: 16,
      size: 'S'
    },
    1665061: {
      quantity: 17,
      size: 'M'
    },
    1665062: {
      quantity: 10,
      size: 'L'
    },
    1665063: {
      quantity: 15,
      size: 'XL'
    },
    1665064: {
      quantity: 6,
      size: 'XXL'
    }
  }
}

const fakeClickHanlder = () => {}

describe('Style Selector Item', function () {
  test('Should render a single img tag', function () {
    const styleSelectorItem = render(<StyleSelectorItem style={styleData} index={0} selectorClickHandler={fakeClickHanlder} />)

    expect(styleSelectorItem.getByRole('img')).toBeInTheDocument()
  })

  test('Should have a data-index attribute on returned img tag', function () {
    const styleSelectorItem = render(<StyleSelectorItem style={styleData} index={0} selectorClickHandler={fakeClickHanlder} />)

    expect(styleSelectorItem.getByRole('img').getAttribute('data-index')).not.toBe(undefined)
  })

  test('Should have a src attribute matching the first photo on the passed in data', function () {
    const styleSelectorItem = render(<StyleSelectorItem style={styleData} index={0} selectorClickHandler={fakeClickHanlder} />)

    expect(styleSelectorItem.getByRole('img').getAttribute('src')).toBe(styleData.photos[0].thumbnail_url)
  })
})
