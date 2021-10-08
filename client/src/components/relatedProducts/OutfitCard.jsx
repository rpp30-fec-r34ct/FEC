/* eslint-disable */
import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import AverageStars from '../Shared/AverageStars.jsx'

export default function OutfitCard ({ deleteOutfit, outfit }) {
  const priceElement = (
    <>
      {outfit.sale
        ? <div className='card-price'>
          <div style={{ color: 'red' }} data-testid={`outfit-sale-${outfit.id}`}>
            ${outfit.sale}
          </div>
          <div style={{ textDecoration: 'line-through', opacity: '50%' }} data-testid={`outfit-price-${outfit.id}`}>
            ${outfit.price}
          </div>
        </div>
        : <div className='card-price'>${outfit.price}</div>}
    </>
  )
  return (
    <div className='product-card'>
      <div className='card-container'>
        <div className='card-visuals'>
          <div className='delete-btn' data-testid='delete-outfit-btn' onClick={() => deleteOutfit(outfit.id)}>
            <AiOutlineCloseCircle />
          </div>
          <div className='card-image' onClick={() => window.location.pathname = `/${outfit.id}/`}>
          {outfit.photo
            ? (
            <img
              src={outfit.photo}
              alt={outfit.name}
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
          <div className='card-category' data-testid={`outfit-category-${outfit.id}`}> {outfit.category}</div>
          <div className='card-name' data-testid={`outfit-name-${outfit.id}`}>{outfit.name}</div>
          {priceElement}
          <AverageStars rating={outfit.ratings}/>
        </div>
      </div>
    </div>
  )
}
