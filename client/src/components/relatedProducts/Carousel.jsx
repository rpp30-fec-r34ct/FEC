import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import 'regenerator-runtime/runtime'
import ProductList from './ProductList.jsx'
import OutfitList from './OutfitList.jsx'
import Comparison from './Comparison.jsx'
import axios from 'axios'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'
import './Carousel.css'

export default function Carousel(props) {
  const [relatedProducts, setRelatedProducts] = useState([])
  const [productDetails, setProductDetails] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [viewModal, setViewModal] = useState(false);

  const currentRelated = relatedProducts.length
  const { productId } = useParams()

  useEffect(() => {
    getRelatedProducts()
  }, [])

  const getRelatedProducts = async () => {
    try {
      const { data } = await axios.get(`/product/${productId}/related`)
      setRelatedProducts(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const getProductDetails = async () => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`)
      setProductDetails(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const resetState = () => {
    setCurrentIndex(0)
  }


  const toggleModal = () => {
    setViewModal(prevState => !prevState)
  }

  const nextCard = () => {
    if (currentIndex >= 0 && currentIndex < (currentRelated - 1)) {
      setCurrentIndex(currentIndex => currentIndex + 1)
    }
  }

  const prevCard = () => {
    if (currentIndex > 0 && currentIndex <= (currentRelated - 1)) {
      setCurrentIndex(currentIndex => currentIndex - 1)
    }
  }

  return (
    <div className='carousels-overview'>
      <h3>RELATED PRODUCTS</h3>
      <div className='carousel-container'>
        {currentIndex > 0 && <FaChevronLeft className='left-arrow' onClick={prevCard} />}
        <div className='carousel-content-wrapper'>
          <div className='carousel-content' style={{ transform: `translateX(${currentIndex * 2}%)` }}>
            <ProductList
              relatedProducts={relatedProducts}
              toggleModal={toggleModal}
              getProductDetails={getProductDetails}
              currentIndex={currentIndex}
              resetState={resetState} />
          </div>
          {currentIndex < (currentRelated - 1) && <FaChevronRight className='right-arrow' onClick={nextCard} />}
        </div>
      </div>
      <div className='outfit-overview'>
        <h3>YOUR OUTFIT</h3>
        <div className='outfit-container'>
          <FaChevronLeft className='left-arrow' />
          <div className='outfit-carousel-wrapper'>
            <div className='outfit-content'>
              <OutfitList />
            </div>
          </div>
          <FaChevronRight className='right-arrow' />
        </div>
      </div>
    </div >
  )
}
