import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import 'regenerator-runtime/runtime'
import ProductList from './ProductList.jsx'
import OutfitList from './OutfitList.jsx'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import {CardSkeleton} from '../StyledComponents/CardSkeleton.jsx'
import axios from 'axios'
import './Carousel.css'

export default function Carousel(props) {
  const [relatedProducts, setRelatedProducts] = useState([])
  const [currentOverview, setCurrentOverview] = useState([])
  const [currentPosition, setCurrentPosition] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setLoading] = useState(false)
  const { productId } = useParams()


  useEffect(() => {
    setLoading(true);
    const timer = setTimeout( async() => {
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

  const placeHolder = Array(4).fill(<CardSkeleton />)

  return (
    <div className='carousels-overview'>
      <h3>RELATED PRODUCTS</h3>
      <div className='carousel-container'>
        {currentPosition < 0 && <FaChevronLeft className='left-arrow' onClick={prevCard} />}
          {isLoading ?
            placeHolder
              :
            <ProductList
              relatedProducts={relatedProducts}
              currentOverview={currentOverview}
              currentIndex={currentIndex}
              currentPosition={currentPosition}
            />
          }
        {relatedProducts.length > 4 && currentIndex < (relatedProducts.length - 4) && <FaChevronRight className='right-arrow' onClick={nextCard} />}
      </div>
          <OutfitList
          currentOverview={currentOverview}
          />
    </div>
  )
}
