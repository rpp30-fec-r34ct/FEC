import React from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useParams } from 'react-router-dom'

const AddCard = (props) => {
  const { productId } = useParams()

  const handleAdd = (e) => {
    e.preventDefault()
    props.addOutfit(productId)
  }
  return (
    <div className='add-card'>
      <div className='add-details'>
        <div className='add-btn' onKeyPress={handleAdd} onClick={handleAdd}><AiOutlinePlusCircle /></div>
        Add to Outfit
      </div>
    </div>
  )
}

export default AddCard
