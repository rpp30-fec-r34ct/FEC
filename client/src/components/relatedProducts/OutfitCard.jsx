/* eslint-disable */
import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import AverageStars from '../Shared/AverageStars.jsx'

export default function OutfitCard ({ deleteOutfit, outfit }) {
  const priceElement = (
    <>
      {outfit.sale
        ? <div className='card-price'>
          <div style={{ color: 'red' }}>
            {outfit.sale}
          </div>
          <div style={{ textDecoration: 'line-through', opacity: '50%' }}>
            {outfit.price}
          </div>
        </div>
        : <div className='card-price'>${outfit.price}</div>}
    </>
  )
  return (
    <div className='product-card'>
      <div className='card-container'>
        <div className='card-visuals'>
          <div className='delete-btn' onClick={() => deleteOutfit(outfit.id)}>
            <AiOutlineCloseCircle />
          </div>
          <div className='card-image' onClick={() => window.location.pathname = `/${outfit.id}/`}>
            <img
              src={outfit.photo}
              alt={outfit.name}
            />
          </div>
        </div>

        <div className='product-details'>
          <div className='card-category'>{outfit.category}</div>
          <div className='card-name'>{outfit.name}</div>
          {priceElement}
          <AverageStars rating={outfit.ratings} />
        </div>
      </div>
    </div>
  )
}
