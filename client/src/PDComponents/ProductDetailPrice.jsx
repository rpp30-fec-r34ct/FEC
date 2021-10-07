import React from 'react'
import './styles/ProductDetailPrice.css'

const ProductDetailPriceComponent = ({ selectedStyle }) => {
  return (
    <div>
      {
      (selectedStyle.sale_price !== null)
        ? <p id='product-price'> <strike>${selectedStyle.original_price}</strike> ${selectedStyle.sale_price}</p>
        : <p id='product-price'> ${selectedStyle.original_price} </p>
      }
    </div>
  )
}

export default ProductDetailPriceComponent
