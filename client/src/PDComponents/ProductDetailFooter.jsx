import React from 'react'
import './styles/ProductDetailFooter.css'

const ProductDetailFooterComponent = ({ productDetails }) => {
  return (
    <div id='product-footer'>
      <div id='product-footer-notes'>
        {productDetails.slogan && <h3>{productDetails.slogan}</h3>}
        {productDetails.description && <p>{productDetails.description}</p>}
      </div>
      <div id='product-features'>
        {productDetails.features.map((entry, index) => {
          return <p key={index}> {entry.feature} : {entry.value} </p>
        })}
      </div>
    </div>
  )
}

export default ProductDetailFooterComponent
