import React, { useState } from 'react'
import Comparison from './Comparison.jsx'
import AverageStars from '../Shared/AverageStars.jsx'
import {CardSkeleton} from '../StyledComponents/CardSkeleton.jsx'

export default function ProductCard({relatedItem, currentOverview}) {
  const priceElement =
    <>
      {relatedItem.sale ?
        <div className='card-price'>
          <div style={{ color: 'red' }}>
            {relatedItem.sale}
          </div>
          <div style={{ textDecoration: 'line-through', opacity: '50%' }}>
            {relatedItem.price}
          </div>
        </div> :
        <div className='card-price'>${relatedItem.price}</div>
      }
    </>

  return (
    < div className='product-card' >
      <div className='card-container'>
        <div className='card-visuals'>
          <Comparison currentOverview={currentOverview} relatedItem={relatedItem} />
          <div className='card-image' onClick={() => window.location.pathname = `/${relatedItem.id}/`}>
            <img
            src={relatedItem.photo}
            alt={relatedItem.name} />
          </div>
        </div>

        <div className='product-details'>
          <div className='card-category'>{relatedItem.category}</div>
          <div className='card-name'>{relatedItem.name}</div>
          {priceElement}
          <AverageStars rating={relatedItem.rating} />
        </div>
      </div>
    </div >
  )
};
