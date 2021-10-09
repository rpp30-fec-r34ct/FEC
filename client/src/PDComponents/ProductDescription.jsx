import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { findTotalReviews } from '../components/Shared/helpers.js'
import './styles/ProductDescription.css'
import { SkeletonLine } from '../components/Shared/SSkeleton.jsx'
import ProductCheckout from './ProductCheckout.jsx'
import AverageStars from '../components/Shared/AverageStars.jsx'
import ProductStyleSelector from './ProductStyleSelector.jsx'
import ProductDetailPrice from './ProductDetailPrice.jsx'
import axios from 'axios'

const ProductDescriptionComponent = ({ productDetails, selectedStyle, styles, updateSelectedStyle, theme }) => {
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
    marginLeft: '20px',
    borderRadius: '10px ',
    backgroundColor: 'hsl(0, 0%, 97%)',
    padding: '15px'
  }

  const darkStyles = {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '20px',
    borderRadius: '10px ',
    backgroundColor: '#444445',
    padding: '15px'
  }

  return (
    <div style={theme === 'light' ? descriptionStyles : darkStyles}>
      <div style={{ display: 'block' }}>
        {ratings && <AverageStars rating={ratings} />}
        {totalReviews > 0 &&
          <a href='' id='overview-review-count' onClick={handleReviewCountClick}> Read All {totalReviews} Reviews</a>}
      </div>
      {productDetails
        ? (
          <div>
            <h4 id='category-title'>{`${productDetails.category}`.toUpperCase()}</h4>
            <h1 id='product-title'>{productDetails.name}</h1>
          </div>)
        : (
          <div>
            <h4><SkeletonLine /></h4>
            <h1><SkeletonLine /></h1>
          </div>)}
      <ProductDetailPrice selectedStyle={selectedStyle} />
      <ProductStyleSelector styles={styles} selectedStyle={selectedStyle} updateSelectedStyle={updateSelectedStyle} />
      <ProductCheckout selectedStyle={selectedStyle} />
    </div>
  )
}

export default ProductDescriptionComponent
