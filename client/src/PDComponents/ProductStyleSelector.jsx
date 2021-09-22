import React from 'react'
import StyleSelectorItem from './StyleSelectorItem.jsx'

const ProductStyleComponent = ({ selectedStyle, productStyles, updateSelectedStyle }) => {
  const handleSelectorClick = (e) => {
    const index = e.target.getAttribute('data-index')
    updateSelectedStyle(index)
  }

  const skeletonStyles = {
    height: '50px',
    width: '50px',
    borderRadius: '50%',
    border: 'solid, 1px, black',
    backgroundColor: '#ddd'
  }

  return (
    <div>
      {(selectedStyle)
        ? (
          <>
            <h2> <b>style {'>'} </b>{selectedStyle.name}</h2>
            {productStyles.map((productStyle, index) => (
              <StyleSelectorItem key={index} index={index} productStyle={productStyle} handleSelectorClick={handleSelectorClick} />
            ))}
          </>
          )
        : [1, 2, 3, 4, 5].map((n, index) => {
            return <img style={skeletonStyles} key={index} />
          })}
    </div>
  )
}

export default ProductStyleComponent
