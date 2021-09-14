/**
 * @jest-environment jsdom
 */
import { describe, test, expect } from 'jest'
import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'

import MainImageGallery from '../../client/src/components/MainImageGallery.jsx'

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

describe('Main Image Gallery Component', function () {
  test('Should render the main image', function () {
    const app = render(<MainImageGallery selectedStyle={styleData} />)
    const imgTags = app.getAllByRole('img')
    const result = (function (imgs) {
      for (const image of imgs) {
        if (image.getAttribute('src') === styleData.photos[0].url) {
          return true
        }
      }
      return false
    }(imgTags))

    expect(result).toBe(true)
  })

  test('Should update the selected photo state when a thumbnail is pressed', function () {
    // first setup the rendered component
    const app = render(<MainImageGallery selectedStyle={styleData} />)

    // now we target an element matching a thumbnail
    const firstThumbnail = app.container.querySelector(`[src="${styleData.photos[1].thumbnail_url}"]`)

    // next, expect that the big non thumbnail image exists
    expect(app.container.querySelector(`[src="${styleData.photos[0].url}"]`)).toBeInTheDocument()

    // also, make sure the image we will swap to does not yet exist
    expect(app.container.querySelector(`[src="${styleData.photos[1].url}"]`)).not.toBeInTheDocument()

    // fire a use event that clicks the thumbnail image
    userEvent.click(firstThumbnail)

    // check to see if the large image was replaced with the big version of our thumbnail.
    expect(app.container.querySelector(`[src="${styleData.photos[1].url}"]`)).toBeInTheDocument()
    expect(app.container.querySelector(`[src="${styleData.photos[0].url}"]`)).not.toBeInTheDocument()
  })
})
