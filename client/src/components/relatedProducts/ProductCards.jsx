import React, { useState } from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import helper from '../../helpers.js';
import Comparison from './Comparison.jsx'

export default function ProductCards(props) {

  return (
    <div className='product-card'>
      <div className='card-container'>
        <div className='card-visuals'>
          <button className='favorite-btn' onClick={() => props.toggleModal}>
            <Comparison />
          </button>
          <div className='card-image'>
            <img src={props.product.photo} />
          </div>


          <div className='product-details'>
            <div className='card-category'>{props.product.category}</div>
            <div className='card-name'>{props.product.name}</div>
            <div className='card-price'>${props.product.sale ? (props.product.sale && props.product.price) : props.product.price}</div>
            <div className='card-rating'>{helper.findStarRating(props.product.rating)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
