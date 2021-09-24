import React, { useState } from 'react'
import SizeSelector from './SizeSelector.jsx'
import QuanitiySelector from './QuanitySelector.jsx'

const ProductCheckoutComponent = ({ selectedStyle }) => {
  const [selectedSize, setSelectedSize] = useState(null)

  const handleSizeChange = (e) => {
    e.preventDefault()
    const sizeId = e.target.value
    updateSelectedSize(selectedStyle.skus[sizeId])
  }

  const updateSelectedSize = (newSelection) => {
    setSelectedSize(newSelection)
  }

  const checkoutStyles = {
    display: 'flex',
    flexDirection: 'column'
  }

  const containerStyles = { display: 'flex', justifyContent: 'space-evenly' }

  return (
    <div style={checkoutStyles}>
      <div style={containerStyles}>
        <SizeSelector selectedStyle={selectedStyle} updateSelectedSize={handleSizeChange} />

        <QuanitiySelector selectedSize={selectedSize} />
      </div>

      <div style={containerStyles}>
        <button>Add to bag    +</button>
        <button>Favorite</button>
      </div>

    </div>
  )
}

export default ProductCheckoutComponent
