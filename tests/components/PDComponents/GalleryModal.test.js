/**
 * @jest-environment jsdom
 */

import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import GalleryModal from '../../../client/src/PDComponents/GalleryModal.jsx'

const styleData = {
  style_id: 286894,
  name: 'Forest Green & Black',
  original_price: '140.00',
  sale_price: null,
  'default?': true,
  photos: [
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
    },
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80'
    },
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80'
    },
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
    },
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80'
    }
  ],
  skus: {
    1665053: {
      quantity: 8,
      size: 'XS'
    },
    1665054: {
      quantity: 16,
      size: 'S'
    },
    1665055: {
      quantity: 17,
      size: 'M'
    },
    1665056: {
      quantity: 10,
      size: 'L'
    },
    1665057: {
      quantity: 15,
      size: 'XL'
    },
    1665058: {
      quantity: 4,
      size: 'XL'
    }
  }
}

describe('Gallery Modal', function () {
  test('Should render the gallery modal with the passed in image index', function () {
    const app = render(
      <GalleryModal selectedStyle={styleData} currentIndex={0} handleClickOffModal={() => {}} />
    )

    expect(app.container.querySelector('#modal-main-img img').getAttribute('src')).toBe(styleData.photos[0].url)
  })

  test('Should change the image when the arrow is clicked', function () {
    const app = render(
      <GalleryModal selectedStyle={styleData} currentIndex={0} handleClickOffModal={() => {}} />
    )
    const rightArrow = app.container.querySelector('#gallery-modal-right-arrow')

    expect(app.container.querySelector('#modal-main-img img').getAttribute('src')).toBe(styleData.photos[0].url)

    userEvent.click(rightArrow)

    expect(app.container.querySelector('#modal-main-img img').getAttribute('src')).toBe(styleData.photos[1].url)

    const leftArrow = app.container.querySelector('#gallery-modal-left-arrow')

    userEvent.click(leftArrow)

    expect(app.container.querySelector('#modal-main-img img').getAttribute('src')).toBe(styleData.photos[0].url)
  })

  test('Should change the image when the sub carousel is clicked', function () {
    const app = render(
      <GalleryModal selectedStyle={styleData} currentIndex={0} handleClickOffModal={() => {}} />
    )

    const secondThumbnailImage = app.container.querySelector('[data-index="1"]')
    expect(app.container.querySelector('#modal-main-img img').getAttribute('src')).toBe(styleData.photos[0].url)

    userEvent.click(secondThumbnailImage)

    expect(app.container.querySelector('#modal-main-img img').getAttribute('src')).toBe(styleData.photos[1].url)
  })
})
