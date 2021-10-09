/**
 * @jest-environment jsdom
 */

 import React from 'react'
 import { render, screen } from '@testing-library/react'
 import '@testing-library/jest-dom'

 // component
 import AddReviewsRecommended from '../../../client/src/components/Review Widget/AddReview/AddReviewsRecommended.jsx'

 const handleReviewRecommendChange = () => {
  console.log('dummy function')
}

 describe('AddReviewsRecommmend Component', () => {
   test('Should be on the DOM', function () {

    render(<AddReviewsRecommended handleReviewRecommendChange={handleReviewRecommendChange} />)

     const reviewRecommend = screen.getByTestId('testAddReviewItem')
     expect(reviewRecommend).toHaveClass('addReviewItem')
   })
 })

