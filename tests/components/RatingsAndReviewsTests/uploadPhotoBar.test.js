
/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// component
import UploadPhotoBar from '../../../client/src/components/Review Widget/AddReview/UploadPhotoBar.jsx'

const addNewUploadedPhoto = () => {
  console.log('dummy function')
}

describe('AddReviewsRecommmend Component', () => {
  test('Should be on the DOM', function () {
    render(<UploadPhotoBar addNewUploadedPhoto={addNewUploadedPhoto} />)

    const photoBar = screen.getByTestId('testUploadPhotos')
    expect(photoBar).toBeInTheDocument()
  })
})
