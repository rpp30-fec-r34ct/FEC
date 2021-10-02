import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

export default function OutfitCard ({deleteOutfit}) {

  const handleDelete = (e) => {
    e.preventDefault()
    deleteOutfit()
  }
  return (
    <div className='outfit-card'>
      <div className='outfit-container'>
        <div className='outfit-visuals'>
          <div className='delete-btn' onKeyPress={handleDelete} onClick={handleDelete}><AiOutlineCloseCircle /></div>
          <div className='outfit-image' />
          <img src='https://via.placeholder.com/200' />
        </div>
      </div>
      <div className='outfit-details'>
        <div className='outfit-category'>CATEGORY</div>
        <div className='outfit-name'>NAME</div>
        <div className='outfit-price'>$PRICE</div>
        <span className='fa fa-star checked' />
        <span className='fa fa-star checked' />
        <span className='fa fa-star checked' />
        <span className='fa fa-star' />
        <span className='fa fa-star' />
      </div>
    </div>
  )
}
