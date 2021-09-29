import React, { useState } from 'react'
import Comparison from './Comparison.jsx'
import { AiOutlineStar } from 'react-icons/ai'
import helper from '../../helpers.js';

export default function ProductCard(props) {

  const priceElement =
    <>
      {props.product.sale ?
        <div className='card-price'>
          <div style={{ color: 'red' }}>
            {props.product.sale}
          </div>
          <div style={{ textDecoration: 'line-through', opacity: '50%' }}>
            {props.product.price}
          </div>
        </div> :
        <div className='card-price'>{props.product.price}</div>
      }
    </>


  return (
    < div className='product-card' >
      <div className='card-container'>
        <div className='card-visuals'>
          <Comparison />
          <div className='card-image' onClick={() => window.location.pathname = `/product/${props.product.id}/`}>
            <img src={props.product.photo} />
          </div>
        </div>

        <div className='product-details'>
          <div className='card-category'>{props.product.category}</div>
          <div className='card-name'>{props.product.name}</div>
          {priceElement}
          <div className='card-rating' style={{ visibility: isNaN(helper.findStarRating(props.product.rating)) && "hidden" }}>
            {helper.findStarRating(props.product.rating)}
          </div>
        </div>
      </div>
    </div >
  )
};
