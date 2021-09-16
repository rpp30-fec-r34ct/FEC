/* eslint-disable */

import React, { useState } from 'react'
import Comparison from './Comparison.jsx'
import { AiOutlineStar } from 'react-icons/ai'

export default function ProductCards(props) {
  const [viewModal, setViewModal] = useState(false)

  const toggleModal = () => {
    setViewModal(!viewModal)
  }
  return (
    <div className='product-card'>
      <div className='card-container'>
        <div className='card-visuals'>
          <div className='favorite-btn'>

            <AiOutlineStar onClick={toggleModal}>
              {viewModal && <Comparison />}
            </AiOutlineStar>
          </div>
          <div className='card-image'>
            <img src={props.product.photo} />
          </div>
        </div>

        <div className='product-details'>
          <div className='card-category'>{props.product.category}</div>
          <div className='card-name' data-testid='item-name'>{props.product.name}</div>
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
