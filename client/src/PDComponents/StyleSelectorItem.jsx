import React from 'react'

const StylesSelectorItemComponent = ({ productStyle, index, handleSelectorClick }) => {
  const styles = {
    height: '50px',
    width: '50px',
    borderRadius: '50%',
    border: 'solid, 1px, black'
  }
  return (
    <img style={styles} src={productStyle.photos[0].thumbnail_url} data-index={index} onClick={handleSelectorClick} />
  )
}

export default StylesSelectorItemComponent
