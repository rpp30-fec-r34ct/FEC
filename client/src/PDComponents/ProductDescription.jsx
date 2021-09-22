import React from 'react'
import ProductCheckout from './ProductCheckout.jsx'
import ProductStars from './ProductStars.jsx'
import ProductStyleSelector from './ProductStyleSelector.jsx'

const ProductDescriptionComponent = ({ productDetails, selectedStyle, updateSelectedStyle, productStyles }) => {
  const styles = {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '20px'
  }
  return (
    <div style={styles}>
      <ProductStars />
      <h4>{productDetails.category}</h4>
      <h2>{productDetails.name}</h2>
      <p>${productDetails.default_price}</p>
      <ProductStyleSelector productStyles={productStyles} selectedStyle={selectedStyle} updateSelectedStyle={updateSelectedStyle} />
      <ProductCheckout />
    </div>
  )
}

export default ProductDescriptionComponent
