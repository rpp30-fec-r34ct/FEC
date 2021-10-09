import React from 'react'
import { SkeletonLine } from '../components/Shared/SSkeleton.jsx'
import './styles/ProductDetailPrice.css'

const ProductDetailPriceComponent = ({ selectedStyle }) => {
  return (
    <>
      {selectedStyle
        ? (
          <div>
            {selectedStyle.sale_price
              ? <p id='product-price'> <strike>${selectedStyle.original_price}</strike> ${selectedStyle.sale_price}</p>
              : <p id='product-price'> ${selectedStyle.original_price} </p>}
          </div>)
        : <div> <SkeletonLine /> </div>}
    </>
  )
}

export default ProductDetailPriceComponent
