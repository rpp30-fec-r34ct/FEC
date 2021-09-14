import React from 'react'

const StylesSelectorItemComponent = (props) => {
  const styles = {
    height: '50px',
    width: '50px',
    borderRadius: '50%',
    border: 'solid, 1px, black'
  }
  return (
    <img style={styles} src={props.style.photos[0].thumbnail_url} data-index={props.index} onClick={props.handleSelectorClick} />
  )
}

export default StylesSelectorItemComponent
