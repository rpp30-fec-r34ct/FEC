/* eslint-disable */
import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import ReviewList from './ReviewList.jsx'
import ReviewMetaData from './ReviewMetaData.jsx'
import './cssFiles/reviewSection.css'
import axios from 'axios'
import ModalContainer from './ModalContainer.jsx'

const ReviewSection = () => {
  const { productId } = useParams()

  const [reviewsMeta, setReviewsMeta] = useState({
    ratings: null,
    recommended: {
      false: 0,
      true: 0
    },
    product_id: productId
  })

  const [activeFilters, setActiveFilters] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true
  })

  const [activeModal, setActiveModal] = useState('')

  useEffect(() => {
    getReviewsMeta()
  }, [])

  const getReviewsMeta = () => {
    axios.get('/reviews/meta', {
      params: {
        product_id: productId
      }
    })
      .then((data) => {
        setReviewsMeta(data.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const getTotalReviews = () => {
    let reviewCount = 0

    if (reviewsMeta.ratings !== null) {
      for (const key in reviewsMeta.ratings) {
        reviewCount = reviewCount + parseInt(reviewsMeta.ratings[key])
      }
    }
    return reviewCount
  }

  const onHandleFilterToggle = (event) => {
    const ratingSelected = event.target.innerText[0]
    let newFilters = {}
    let trueCount = 0
    Object.assign(newFilters, activeFilters)
    let allActive = true

    for (const key in newFilters) {
      if (newFilters[key] === false) {
        allActive = false
      }
    }
    if (allActive) {
      for (const key in newFilters) {
        if (key !== ratingSelected) {
          newFilters[key] = false
        }
      }
    } else {
      for (const key in newFilters) {
        if (key === ratingSelected) {
          newFilters[key] ? newFilters[key] = false : newFilters[key] = true
        }
        if (newFilters[key]) {
          trueCount = trueCount + 1
        }
      }

      // once we've toggled the filters as requested, if we are back to having all filters set to false, then we are in a default state. Turn all filters to true
      if (trueCount === 0) {
        newFilters = {
          1: true,
          2: true,
          3: true,
          4: true,
          5: true
        }
      }
    }

    setActiveFilters(newFilters)
  }

  const handleClearFilter = () => {
    const newFilters = {
      1: true,
      2: true,
      3: true,
      4: true,
      5: true
    }
    setActiveFilters(newFilters)
  }

  const onPhotoClick = (event) => {
    setActiveModal(event.target.src)
  }

  const onClickClose = (event) => {
    setActiveModal('')
  }

  return (
    <div>
      <h3>Ratings and Reviews</h3>
      <div className='reviewSection'>
        <ReviewMetaData metaData={reviewsMeta} totalReviews={getTotalReviews()} onHandleFilterToggle={onHandleFilterToggle} activeFilters={activeFilters} handleClearFilter={handleClearFilter} />
        <ReviewList product_id={productId} totalReviews={getTotalReviews()} activeFilters={activeFilters} onPhotoClick={onPhotoClick} />
        <ModalContainer activeModal={activeModal} onClickClose={onClickClose} />
      </div>
    </div>
  )
}

export default ReviewSection
