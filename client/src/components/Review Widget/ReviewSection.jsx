import { useParams } from 'react-router-dom'
import React from 'react'
import ReviewList from './ReviewList.jsx'
import ReviewMetaData from './ReviewMetaData.jsx'
import './cssFiles/reviewSection.css'

const ReviewSection = () => {
  const { productId } = useParams()

  return (
    <div>
      <h3>Ratings and Reviews</h3>
      <div className='reviewSection'>
        <ReviewMetaData product_id={productId} />
        <ReviewList product_id={productId} />
      </div>
    </div>
  )
}

export default ReviewSection
