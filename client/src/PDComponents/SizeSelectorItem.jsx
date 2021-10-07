import React from 'react'

const SizeSelectorItemComponent = ({ item, name }) => {
  return (
    <option value={name} disabled={item.quanity}>{item.size}</option>
  )
}

export default SizeSelectorItemComponent
