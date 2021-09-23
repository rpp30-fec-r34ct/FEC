import React from 'react'

const ProductDetailPriceComponent = (props) => {
  return (
    <div>
      {
      (props.selectedStyle.sales_price !== null)
        ? <p> <strike>${props.selectedStyle.default_price}</strike> ${props.selectedStyle.sales_price}</p>
        : <p> ${props.selectedStyle.default_price} </p>
      }
    </div>
  )
}

export default ProductDetailPriceComponent
