import React from 'react'

const ProductDetailPriceComponent = ({ selectedStyle }) => {
  return (
    <div>
      {
      (selectedStyle.sale_price !== null)
        ? <p> <strike style={{ color: 'red' }}>${selectedStyle.original_price}</strike> ${selectedStyle.sale_price}</p>
        : <p> ${selectedStyle.original_price} </p>
      }
    </div>
  )
}

export default ProductDetailPriceComponent
