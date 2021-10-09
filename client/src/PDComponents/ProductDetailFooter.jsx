import React from 'react'
import { SkeletonLine } from '../components/Shared/SSkeleton.jsx'
import './styles/ProductDetailFooter.css'

const ProductDetailFooterComponent = ({ productDetails, theme }) => {

  const lightStyles = {
    backgroundColor: 'rgb(236 236 236)',
    borderRadius: '10px'
  }

  const darkStyles = {
    borderRadius: '10px ',
    backgroundColor: 'rgb(44 44 45)',
  }

  return (
    <>
      {productDetails
        ? (
          <div style={theme === 'light' ? lightStyles : darkStyles} id='product-footer'>
            <div id='product-footer-notes'>
              {productDetails.slogan && <h3>{productDetails.slogan}</h3>}
              {productDetails.description && <p>{productDetails.description}</p>}
            </div>
            <div id='product-features'>
              {productDetails.features.map((entry, index) => {
                return <p key={index}> {entry.feature} : {entry.value} </p>
              })}
            </div>
          </div>)
        : (
          <div id='product-footer'>
            <div id='product-footer-notes'>
              <h3><SkeletonLine /></h3>
              <SkeletonLine />
            </div>
            <div id='product-features'>
              <SkeletonLine />
              <SkeletonLine />
              <SkeletonLine />
            </div>
          </div>)}
    </>
  )
}

export default ProductDetailFooterComponent
