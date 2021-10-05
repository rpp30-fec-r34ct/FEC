import React, { useState } from 'react'
import Comparison from './Comparison.jsx'
import AverageStars from '../Shared/AverageStars.jsx'
import {CardSkeleton} from '../StyledComponents/CardSkeleton.jsx'

export default function ProductCard({relatedProduct, currentOverview}) {
  const priceElement =
    <>
      {relatedProduct.sale ?
        <div className='card-price'>
          <div style={{ color: 'red' }}>
            {relatedProduct.sale}
          </div>
          <div style={{ textDecoration: 'line-through', opacity: '50%' }}>
            {relatedProduct.price}
          </div>
        </div> :
        <div className='card-price'>${relatedProduct.price}</div>
      }
    </>

  return (
    < div className='product-card' >
      <div className='card-container'>
        <div className='card-visuals'>
          <Comparison currentOverview={currentOverview} relatedProduct={relatedProduct} />
          <div className='card-image' onClick={() => window.location.pathname = `/${relatedProduct.id}/`}>
            <img src={relatedProduct.photo} />
          </div>
        </div>

        <div className='product-details'>
          <div className='card-category'>{relatedProduct.category}</div>
          <div className='card-name'>{relatedProduct.name}</div>
          {priceElement}
          <AverageStars rating={relatedProduct.rating} />
        </div>
      </div>
    </div >
  )
};
