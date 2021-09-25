import React, { useState } from 'react'
import Comparison from './Comparison.jsx'
import { AiOutlineStar } from 'react-icons/ai'
import helper from '../../helpers.js';

export default function ProductCard(props) {

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
          <div className='card-price'>${props.product.sale ? (props.product.sale && props.product.price) : props.product.price}</div>
          <div className='card-rating' style={{ visibility: isNaN(helper.findStarRating(props.product.rating)) ? "hidden" : "" }}>
            {helper.findStarRating(props.product.rating)}
          </div>
        </div>
      </div>
    </div >
  )
};
