import React from 'react'
import { IoMdAddCircle } from 'react-icons/io'

const AddCard = ({ addOutfit }) => {
  const handleAdd = (e) => {
    e.preventDefault()
    addOutfit()
  }
  return (
    <div
      className='add-card'
      style={{ width: '100%', maxWidth: '200px' }}
    >
      <div className='add-details'>
        <div
          data-testid='add-outfit-button'
          className='add-btn'
          onClick={handleAdd}
        >
          <IoMdAddCircle style={{margin: 'auto'}} aria-pressed='false'/>
        </div>
        Add to Outfit
      </div>
    </div>
  )
}

export default AddCard
