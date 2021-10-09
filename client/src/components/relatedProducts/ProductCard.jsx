/* eslint-disable */
import React from 'react'
import Comparison from './Comparison.jsx'
import AverageStars from '../Shared/AverageStars.jsx'

export default function ProductCard ({ relatedItem, currentOverview }) {
  const priceElement = (
    <>
      {relatedItem.sale
        ? <div className='card-price' style={{display: 'flex'}}>

        <div style={{ color: 'red', float: 'left'  }} data-testid={`rel-product-sale-${relatedItem.id}`}>
            ${relatedItem.sale}
          </div>
           <div style={{ textDecoration: 'line-through', opacity: '50%' }} data-testid={`rel-product-price-${relatedItem.id}`}>
            ${relatedItem.price}
          </div>
        </div>
        : <div className='card-price'>${relatedItem.price}</div>}
    </>
  )

  return (
    <div className='product-card'>
      <div className='card-container'>
        <div className='card-visuals'>
          <Comparison currentOverview={currentOverview} relatedItem={relatedItem} />
          <div className='card-image' onClick={() => window.location.pathname = `/${relatedItem.id}/`}>
          {relatedItem.photo
            ? (
            <img
              src={relatedItem.photo}
              alt={relatedItem.name}
            />
            )
          : <img
          src={`https://via.placeholder.com/220x200?text=Image+Not+Available`}
          alt='no-image'
          />
          }
          </div>
        </div>

        <div className='product-details'>
          <div className='card-category' data-testid={`rel-product-category-${relatedItem.id}`}>{relatedItem.category}</div>
          <div className='card-name' data-testid={`rel-product-name-${relatedItem.id}`}>{relatedItem.name}</div>
          {priceElement}
          <AverageStars rating={relatedItem.rating} />
        </div>
      </div>
    </div>
  )
};
