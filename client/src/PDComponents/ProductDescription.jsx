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

  const skeletonStyles = {
    width: '200px',
    height: '20px',
    backgroundColor: '#ddd',
    margin: '10px 0'
  }
  return (
    <div style={styles}>
      {productDetails
        ? (
          <>
            <ProductStars />
            <div>
              <h4>{productDetails.category}</h4>
              <h2>{productDetails.name}</h2>
              <p>${productDetails.default_price}</p>
            </div>
            <ProductStyleSelector productStyles={productStyles} selectedStyle={selectedStyle} updateSelectedStyle={updateSelectedStyle} />
            <ProductCheckout />
          </>
          )
        : (
          <>
            <ProductStars />
            <div style={skeletonStyles}> </div>
            <div style={skeletonStyles}> </div>
            <div style={skeletonStyles}> </div>
            <ProductStyleSelector productStyles={productStyles} selectedStyle={selectedStyle} updateSelectedStyle={updateSelectedStyle} />
            <ProductCheckout />
          </>
          )}

    </div>
  )
}

export default ProductDescriptionComponent
