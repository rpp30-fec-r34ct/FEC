import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

export default function OutfitCard (props) {
  return (
    <div className='outfit-card'>
      <div className='outfit-details'>
        <div className='delete-btn'><AiOutlineCloseCircle /></div>
        Delete Outfit
      </div>
    </div>
  )
}
