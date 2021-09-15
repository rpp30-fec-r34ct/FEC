import React from 'react'
// import Comparison from './Comparison.jsx'
import { AiOutlineStar } from 'react-icons/ai'
// import { RiCameraOffFill } from 'react-icons/ri'

export default function ProductCards (props) {
  return (
    <div className='product-card'>
      <div className='card-container'>
        <div className='card-visuals'>
          <div className='favorite-btn'><AiOutlineStar /></div>
          <div className='card-image'>
            <img src={props.product.photo} />
          </div>
        </div>

        <div className='product-details'>
          <div className='card-category'>{props.product.category}</div>
          <div className='card-name'>{props.product.name}</div>
          <div className='card-price'>${props.product.sale ? (props.product.sale && props.product.price) : props.product.price}</div>
          <span className='fa fa-star checked' />
          <span className='fa fa-star checked' />
          <span className='fa fa-star checked' />
          <span className='fa fa-star' />
          <span className='fa fa-star' />
        </div>
      </div>
    </div>
  )
}
