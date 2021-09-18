import React from 'react'
import StyleSelectorItem from './StyleSelectorItem.jsx'

const ProductStyleComponent = (props) => {
  const handleSelectorClick = (e) => {
    const index = e.target.getAttribute('data-index')
    props.updateSelectedStyle(index)
  }

  let styleSelectors = []

  if (props.styles.length > 0) {
    styleSelectors = props.styles.map((style, index) => (
      <StyleSelectorItem key={index} index={index} style={style} handleSelectorClick={handleSelectorClick} />
    ))
  }

  return (
    <div>
      <h2> <b>style {'>'} </b>{props.selectedStyle.name}</h2>
      {styleSelectors}
    </div>
  )
}

export default ProductStyleComponent
