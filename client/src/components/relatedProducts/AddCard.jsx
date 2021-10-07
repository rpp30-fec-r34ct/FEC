import React from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'

const AddCard = ({ addOutfit }) => {
  const handleAdd = (e) => {
    e.preventDefault()
    addOutfit()
  }
  return (
    <div className='add-card' style={{width: '100%', maxWidth: '200px'}}>
      <div className='add-details'>
        <div className='add-btn' onClick={handleAdd}><AiOutlinePlusCircle /></div>
        Add to Outfit
      </div>
    </div>
  )
}

export default AddCard
