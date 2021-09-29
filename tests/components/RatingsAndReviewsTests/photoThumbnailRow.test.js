/**
 * @jest-environment jsdom
 */

 import React from 'react'
 import { render, screen } from '@testing-library/react'
 import '@testing-library/jest-dom'

 const photos =
 [
  {
      id: 1476026,
      url: 'https://images.unsplash.com/photo-1560829675-11dec1d78930?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80'
  },
  {
      id: 1476027,
      url: 'https://images.unsplash.com/photo-1549812474-c3cbd9a42eb9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
  },
  {
      id: 1476028,
      url: 'https://images.unsplash.com/photo-1559709319-3ae960cda614?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
  }
]

 // component
 import PhotoThumbnailRow from '../../../client/src/components/Review Widget/PhotoThumbnailRow.jsx'


 describe('Photo Thumbnail', () => {
   test('Should be on the DOM', function () {
     render(<PhotoThumbnailRow photos={photos} />)

     const photoThumbnailElement = screen.getByTestId('testPhotoThumbnailRow')
     expect(photoThumbnailElement).toBeInTheDocument()
   })
 })