import React, { useState } from 'react'
import SizeSelector from './SizeSelector.jsx'
import QuanitiySelector from './QuanitySelector.jsx'

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
    // focus on drop down
  }

  const updateSelectedSize = (newSelection, sizeId) => {
    setSelectedSize(newSelection)
    setSelectedSku(sizeId)
  }

  const checkoutStyles = {
    display: 'flex',
    flexDirection: 'column'
  }

  const containerStyles = { display: 'flex', justifyContent: 'space-evenly', marginTop: '2em' }

  const buttonStyles = {height: '2em', width: '10em', borderRaidus: 0, textAlign: 'center', backgroundColor: 'transparent', border: 'solid 1px black'}
  return (
    <div style={checkoutStyles}>
      <div style={containerStyles}>
        <SizeSelector selectedStyle={selectedStyle} updateSelectedSize={handleSizeChange} />

        <QuanitiySelector selectedSize={selectedSize} />
      </div>

      <div style={containerStyles}>
        <button style={buttonStyles}>Add to bag    +</button>
        <button style={buttonStyles}>Favorite</button>
      </div>

    </div>
  )
}

export default ProductCheckoutComponent
