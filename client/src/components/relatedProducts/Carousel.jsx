import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import 'regenerator-runtime/runtime'
import ProductList from './ProductList.jsx'
import OutfitList from './OutfitList.jsx'
import axios from 'axios'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/Ri'
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
      const { data } = await axios.get(`/api/products/${productId}`)
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
        {currentPosition > 0 && <RiArrowLeftSLine className='left-arrow' onClick={prevCard} />}
        <ProductList
          relatedProducts={relatedProducts}
          currentProduct={currentProduct}
          currentIndex={currentIndex}
          currentPosition={currentPosition}
        />
        {relatedProducts.length > 4 && currentIndex < (relatedProducts.length - 4) && <RiArrowRightSLine className='right-arrow' onClick={nextCard} />}
      </div>
      <div className='outfit-overview'>
        <h3>YOUR OUTFIT</h3>
        <div className='outfit-container'>
          <RiArrowLeftSLine className='left-arrow' />
          <div className='outfit-carousel-wrapper'>
            <div className='outfit-content'>
              <OutfitList />
            </div>
          </div>
          <RiArrowRightSLine className='right-arrow' />
        </div>
      </div>
    </div >
  )
}
