import React, { useState } from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import helper from '../../helpers.js';
import Comparison from './Comparison.jsx'

export default function ProductCards(props) {


  // const handleModalClick = () => {
  //   const { product, toggleModal } = props;
  //   // getProductDetails(product.id)
  // }


  return (
    <div className='product-card'>
      <div className='card-container'>
        <div className='card-visuals'>
          <div className='favorite-btn'>

            <AiOutlineStar >

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
