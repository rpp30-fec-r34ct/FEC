import React, { useState } from 'react'
import { useParams } from 'react-router'
import SizeSelector from './SizeSelector.jsx'
import QuanitiySelector from './QuanitySelector.jsx'
import AddToCart from './AddToCart.jsx'
import './styles/ProductCheckout.css'

const ProductCheckoutComponent = ({ selectedStyle }) => {
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedSku, setSelectedSku] = useState(null)

  const handleSizeChange = (e) => {
    e.preventDefault()
    const sizeId = e.target.value
    updateSelectedSize(selectedStyle.skus[sizeId], sizeId)
  }

  const handleNoSkuClick = (e) => {
    e.preventDefault()
    document.querySelector('#style-select').focus()
  }

  const updateSelectedSize = (newSelection, sizeId) => {
    setSelectedSize(newSelection)
    setSelectedSku(sizeId)
  }

  return (
    <div id='checkout-container'>
      <div className='checkout-sub-top-container'>
        <SizeSelector selectedStyle={selectedStyle} updateSelectedSize={handleSizeChange} />

        <QuanitiySelector selectedSize={selectedSize} />
      </div>

      <div className='checkout-sub-top-container'>
        <AddToCart sku={selectedSku} handleNoSkuClick={handleNoSkuClick} selectedSize={selectedSize} />
      </div>

    </div>
  )
}

export default ProductCheckoutComponent
