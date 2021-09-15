import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductList from './relatedProducts/ProductList.jsx'
import OutfitList from './userOutfit/OutfitList.jsx'
import axios from 'axios'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'
import './Carousel.css'

export default function Carousel (props) {
  const [relatedProducts, setRelatedProducts] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const length = relatedProducts.length
  const { productId } = useParams()

  useEffect(() => {
    getRelatedProducts()
  }, [])

  const getRelatedProducts = () => {
    axios.get(`/product/${productId}/related`)
      .then((data) => {
        console.log('data received from server for product')
        setRelatedProducts(data.data)
      })
      .catch((err) => {
        console.error('error while getting product data from server')
        return err
      })
  }

  const nextCard = () => {
    if (currentIndex >= 0 && currentIndex < (length - 1)) {
      setCurrentIndex(currentIndex => currentIndex + 1)
    }
  }

  const prevCard = () => {
    if (currentIndex > 0 && currentIndex <= (length - 1)) {
      setCurrentIndex(currentIndex => currentIndex - 1)
    }
  }

  return (
    <div>
      <h3>RELATED PRODUCTS</h3>
      <div className='carousel-container'>
        {currentIndex > 0 && <FaChevronLeft className='left-arrow' onClick={prevCard} />}
        <div className='carousel-content-wrapper'>
          <div className='carousel-content' style={{ transform: `translateX(-${currentIndex * 80}%)` }}>
            {
              relatedProducts.map((product) => {
                return <ProductList key={product.id} product={product} />
              })
            }
          </div>
        </div>
        {currentIndex < (length - 1) && <FaChevronRight className='right-arrow' onClick={nextCard} />}
      </div>
      <div>
        <h3>YOUR OUTFIT</h3>
        <div className='outfit-container'>
          {currentIndex > 0 && <FaChevronLeft className='left-arrow' onClick={prevCard} />}
          <div className='outfit-carousel-wrapper'>
            <div className='outfit-content' style={{ transform: `translateX(-${currentIndex * 80}%)` }}>
              <OutfitList />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
