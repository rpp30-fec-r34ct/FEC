import React from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useParams } from 'react-router-dom'

const AddCard = ({addOutfit}) => {
  const handleAdd = (e) => {
    e.preventDefault()
    addOutfit()
  }
  return (
    <div className='add-card'>
      <div className='add-details'>
        <div className='add-btn' onClick={handleAdd}><AiOutlinePlusCircle /></div>
        Add to Outfit
      </div>
    </div>
  )
}

export default AddCard
