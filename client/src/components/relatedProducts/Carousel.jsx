import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import 'regenerator-runtime/runtime'
import ProductList from './ProductList.jsx'
import OutfitList from './OutfitList.jsx'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { CardSkeleton } from '../StyledComponents/CardSkeleton.jsx'
import axios from 'axios'
import './Carousel.css'

export default function Carousel (props) {
  const [relatedProducts, setRelatedProducts] = useState([])
  const [currentOverview, setCurrentOverview] = useState([])
  const [currentPosition, setCurrentPosition] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setLoading] = useState(false)
  const { productId } = useParams()

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(async () => {
      await getOverviewProduct()
      await getRelatedProducts()
      setLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  const getRelatedProducts = async () => {
    try {
      const { data } = await axios.get(`/product/${productId}/related`)
      setRelatedProducts(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const getOverviewProduct = async () => {
    try {
      const { data } = await axios.get(`/productDetail/${productId}`)
      setCurrentOverview(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const nextCard = () => {
    setCurrentIndex(currentIndex => currentIndex + 1)
    setCurrentPosition(currentPosition - 220)
  }

  const prevCard = () => {
    setCurrentIndex(currentIndex => currentIndex - 1)
    setCurrentPosition(currentPosition + 220)
  }

  const placeHolder = Array(4).fill('')

  return (
    <div className='carousels-overview'>
      <h3 data-testid='rel-product-header'>RELATED PRODUCTS</h3>
      <div className='carousel-container' data-testid='rel-product-carousel'>
        {currentPosition < 0 && <FaChevronLeft className='left-arrow' onClick={prevCard} data-testid='left-arrow-1' />}
        {isLoading
          ? placeHolder.map((card, index) => (
            <CardSkeleton key={index} />
            ))
          : <ProductList
              relatedProducts={relatedProducts}
              currentOverview={currentOverview}
              currentIndex={currentIndex}
              currentPosition={currentPosition}
            />}
        {relatedProducts.length > 4 && currentIndex < (relatedProducts.length - 4) && <FaChevronRight className='right-arrow' onClick={nextCard} data-testid='right-arrow-1' />}
      </div>
      <OutfitList
        currentOverview={currentOverview}
      />
    </div>
  )
}
