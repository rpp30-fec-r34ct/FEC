import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { findTotalReviews } from '../components/Shared/helpers.js'
import ProductCheckout from './ProductCheckout.jsx'
import AverageStars from '../components/Shared/AverageStars.jsx'
import ProductStyleSelector from './ProductStyleSelector.jsx'
import axios from 'axios'

const ProductDescriptionComponent = ({ productDetails, selectedStyle, styles, updateSelectedStyle }) => {
  const { productId } = useParams()
  const [ratings, setRatings] = useState(null)
  const [totalReviews, setTotalReviews] = useState(0)

  const getProductRatings = () => {
    return new Promise((resolve, reject) => {
      axios.get('/api/reviews/meta', { params: { product_id: productId } })
        .then(res => {
          resolve(res.data.ratings)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  const handleReviewCountClick = (e) => {
    e.preventDefault()
    document.querySelector('.reviewSection').scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    getProductRatings()
      .then(ratings => {
        setRatings(ratings)
        setTotalReviews(findTotalReviews(ratings))
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const descriptionStyles = {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '20px'
  }
  return (
    <div style={descriptionStyles}>
      <div style={{ display: 'block' }}>
        {ratings && <AverageStars rating={ratings} />}
        {totalReviews > 0 &&
          <a href='' id='overview-review-count' onClick={handleReviewCountClick}> {totalReviews} Reviews</a>}
      </div>
      <h4>{productDetails.category}</h4>
      <h2>{productDetails.name}</h2>
      <p>${productDetails.default_price}</p>
      <ProductStyleSelector styles={styles} selectedStyle={selectedStyle} updateSelectedStyle={updateSelectedStyle} />
      <ProductCheckout selectedStyle={selectedStyle} />
    </div>
  )
}

export default ProductDescriptionComponent
