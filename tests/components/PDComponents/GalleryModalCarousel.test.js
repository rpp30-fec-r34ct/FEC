/**
 * @jest-environment jsdom
 */

import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import GalleryModalCarousel from '../../../client/src/PDComponents/GalleryModalCarousel.jsx'

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

describe('Gallery Modal Carousel', function () {
  test('Should render the image thumbnails', function () {
    const app = render(
      <GalleryModalCarousel selectedStyle={styleData} imageClickHandler={() => {}} />
    )
    expect(app.getAllByRole('img').length).toBe(6)
  })

  test('Should show the left arrow when the carousel moves', function () {
    const app = render(
      <GalleryModalCarousel selectedStyle={styleData} imageClickHandler={() => {}} />
    )
    expect(app.container.querySelector('#gallery-modal-carousel-left-arrow').classList.contains('hidden')).toBeTruthy()
    const rightArrow = app.container.querySelector('#gallery-modal-carousel-right-arrow')
    userEvent.click(rightArrow)
    expect(app.container.querySelector('#gallery-modal-carousel-left-arrow').classList.contains('hidden')).not.toBeTruthy()
    const leftArrow = app.container.querySelector('#gallery-modal-carousel-left-arrow')
    userEvent.click(leftArrow)
    expect(app.container.querySelector('#gallery-modal-carousel-left-arrow').classList.contains('hidden')).toBeTruthy()
  })

  test('Should hide the right arrow when the carousel moves far enough', function () {
    const app = render(
      <GalleryModalCarousel selectedStyle={styleData} imageClickHandler={() => {}} />
    )
    expect(app.container.querySelector('#gallery-modal-carousel-right-arrow').classList.contains('hidden')).not.toBeTruthy()
    const rightArrow = app.container.querySelector('#gallery-modal-carousel-right-arrow')
    userEvent.click(rightArrow)
    userEvent.click(rightArrow)
    userEvent.click(rightArrow)
    userEvent.click(rightArrow)
    userEvent.click(rightArrow)
    expect(app.container.querySelector('#gallery-modal-carousel-right-arrow').classList.contains('hidden')).toBeTruthy()
  })
})
