import React, { useState } from 'react'
import Comparison from './Comparison.jsx'
import { AiOutlineStar } from 'react-icons/ai'
import helper from '../../helpers.js';

const ProductCard = ({ product }) => (
  <div className='product-card'>
    <div className='card-container'>
      <div className='card-visuals'>
        <div className='favorite-btn'>
          <Comparison name={name} />
        </div>
        <div className='card-image'>
          <img src={product.photo} />
        </div>
      </div>

      <div className='product-details'>
        <div className='card-category'>{product.category}</div>
        <div className='card-name'>{product.name}</div>
        <div className='card-price'>${product.sale ? (product.sale && product.price) : product.price}</div>
        <div className='card-rating'>{helper.findStarRating(product.rating)}</div>
      </div>
    </div>
  </div>
);

export default ProductCard;

