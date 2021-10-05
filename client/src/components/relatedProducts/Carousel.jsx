import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import 'regenerator-runtime/runtime'
import ProductList from './ProductList.jsx'
import OutfitList from './OutfitList.jsx'
import axios from 'axios'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import './Carousel.css'

export default function Carousel(props) {
  const [relatedProducts, setRelatedProducts] = useState([])
  const [currentProduct, setCurrentProduct] = useState([])
  const [currentPosition, setCurrentPosition] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const { productId } = useParams()


  useEffect(() => {
    getRelatedProducts()
    getCurrentProduct()
  }, [])

  const getRelatedProducts = async () => {
    try {
      const { data } = await axios.get(`/product/${productId}/related`)
      setRelatedProducts(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const getCurrentProduct = async () => {
    try {
      const { data } = await axios.get(`/productDetail/${productId}`)
      setCurrentProduct(data)
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

  return (
    <div className='carousels-overview'>
      <h3>RELATED PRODUCTS</h3>
      <div className='carousel-container'>
        {currentPosition < 0 && <FaChevronLeft className='left-arrow' onClick={prevCard} />}
        <ProductList
          relatedProducts={relatedProducts}
          currentProduct={currentProduct}
          currentIndex={currentIndex}
          currentPosition={currentPosition}
        />
        {relatedProducts.length > 4 && currentIndex < (relatedProducts.length - 4) && <FaChevronRight className='right-arrow' onClick={nextCard} />}
      </div>
      <OutfitList
      currentProduct={currentProduct}
      />
    </div >
  )
}
