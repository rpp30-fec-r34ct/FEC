import React, { useState } from 'react'
import { useParams } from 'react-router'
import SizeSelector from './SizeSelector.jsx'
import QuanitiySelector from './QuanitySelector.jsx'
import AddToCart from './AddToCart.jsx'

const ProductCheckoutComponent = ({ selectedStyle }) => {
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedSku, setSelectedSku] = useState(null)
  const { productId } = useParams()

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

  const handleFavoriteButtonClick = () => {
    console.log('click!')
    let outfitStorage = JSON.parse(localStorage.getItem('FECOutfit'));
    if (outfitStorage === null) {
      outfitStorage = []
    }
    outfitStorage.push(productId)
    localStorage.setItem('FECOutfit', JSON.stringify(outfitStorage))
  }

  const checkoutStyles = {
    display: 'flex',
    flexDirection: 'column'
  }

  const containerStyles = { display: 'flex', justifyContent: 'space-evenly', marginTop: '2em' }

  const buttonStyles = {height: '2em', width: '10em', borderRaidus: 0, textAlign: 'center', backgroundColor: 'transparent', border: 'solid 1px black', cursor: 'pointer'}
  return (
    <div style={checkoutStyles}>
      <div style={containerStyles}>
        <SizeSelector selectedStyle={selectedStyle} updateSelectedSize={handleSizeChange} />

        <QuanitiySelector selectedSize={selectedSize} />
      </div>

      <div style={containerStyles}>
        <AddToCart sku={selectedSku} handleNoSkuClick={handleNoSkuClick} />
        <button style={buttonStyles} onClick={handleFavoriteButtonClick}>Favorite</button>
      </div>

    </div>
  )
}

export default ProductCheckoutComponent
