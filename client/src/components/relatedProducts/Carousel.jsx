import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import 'regenerator-runtime/runtime'
import ProductList from './ProductList.jsx'
import OutfitList from './OutfitList.jsx'
import axios from 'axios'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'
import './Carousel.css'

export default function Carousel(props) {
  const [relatedProducts, setRelatedProducts] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [viewModal, setModal] = useState(false);
  const length = relatedProducts.length
  const { productId } = useParams()

  useEffect(() => {
    getRelatedProducts()
    getSelectedProducts()
  }, [])

  const getRelatedProducts = async () => {
    try {
      const { data } = await axios.get(`/product/${productId}/related`)
      setRelatedProducts(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const getSelectedProducts = async () => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`)
      setSelectedProducts(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const toggleModal = () => {
    setViewModal(prevState => !prevState)
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
    <div className='carousels-overview'>
      <h3>RELATED PRODUCTS</h3>
      <div className='carousel-container'>
        {currentIndex > 0 && <FaChevronLeft className='left-arrow' onClick={prevCard} />}
        <div className='carousel-content-wrapper'>
          <div className='carousel-content' style={{ transform: `translateX(-${currentIndex * 25}%)` }}>
            {
              relatedProducts.map((product, index) => {
                return <ProductList key={index} product={product} toggleModal={toggleModal} />
              })
            }
          </div>
        </div>
        {currentIndex < (length - 1) && <FaChevronRight className='right-arrow' onClick={nextCard} />}
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
    </div>
  )
}
