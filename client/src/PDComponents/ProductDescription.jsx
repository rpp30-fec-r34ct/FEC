import React from 'react'
import ProductCheckout from './ProductCheckout.jsx'
import ProductStars from './ProductStars.jsx'
import ProductStyleSelector from './ProductStyleSelector.jsx'

const ProductDescriptionComponent = ({ productDetails, selectedStyle, styles, updateSelectedStyle }) => {
  const descriptionStyles = {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '20px'
  }
  return (
    <div style={descriptionStyles}>
      <ProductStars />
      <h4>{productDetails.category}</h4>
      <h2>{productDetails.name}</h2>
      <p>${productDetails.default_price}</p>
      <ProductStyleSelector styles={styles} selectedStyle={selectedStyle} updateSelectedStyle={updateSelectedStyle} />
      <ProductCheckout selectedStyle={selectedStyle} />
    </div>
  )
}

export default ProductDescriptionComponent
