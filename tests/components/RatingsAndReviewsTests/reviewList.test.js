/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ReviewList from '../../../client/src/components/Review Widget/ReviewList.jsx'



const activeFilters =
  {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true
  }

const getTotalReviews = () => {
  return 5;
}

const productId = 47424;

const onPhotoClick = () => {
  console.log('dummy function');
}

const onAddReviewClick = () => {
  console.log('dummy function');
}


 describe('Review List Component', () => {
   test('Should render the add review button', function () {

     render(<ReviewList testing={true} product_id={productId} totalReviews={getTotalReviews()} activeFilters={activeFilters} onPhotoClick={onPhotoClick} onAddReviewClick={onAddReviewClick} />)

     const AddReviewBtn = screen.getByText('Add Review +')
     expect(AddReviewBtn).toBeInTheDocument();
   })
 })