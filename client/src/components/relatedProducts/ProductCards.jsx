import React, { useState } from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import helper from '../../helpers.js';

export default function ProductCards(props) {




  return (
    <div className='product-card'>
      <div className='card-container'>
        <div className='card-visuals'>
          <div className='favorite-btn'>

            <AiOutlineStar onClick={props.toggleModal}>
            </AiOutlineStar>
          </div>
          <div className='card-image'>
            <img src={props.product.photo} />
          </div>
        </div>

        <div className='product-details'>
          <div className='card-category'>{props.product.category}</div>
          <div className='card-name'>{props.product.name}</div>
          <div className='card-price'>${props.product.sale ? (props.product.sale && props.product.price) : props.product.price}</div>
          <div className='card-rating'>{helper.findStarRating(props.product.rating)}</div>
        </div>
      </div>
    </div>
  )
}
