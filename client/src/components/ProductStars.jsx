import React from 'react'

const ProductStarsComponent = (props) => {
  const totalStars = 5
  const tempRating = 4.8
  const roundedRating = Math.round((tempRating * 4) / 4).toFixed(2)
  const fillPercentage = ((roundedRating / totalStars) * 100)

  const stylesOuter = {
    fontFamily: 'Font Awesome Free',
    fontWeight: 900,
    color: 'grey',
    position: 'relative',
    display: 'inline-block'
  }

  const stylesInner = {
    fontFamily: 'Font Awesome Free',
    fontWeight: 900,
    color: 'orange',
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${fillPercentage}%`,
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  }

  return (
    <div>
      <div id='starsOuter' style={stylesOuter}>
        <i className='fas fa-star' />
        <i className='fas fa-star' />
        <i className='fas fa-star' />
        <i className='fas fa-star' />
        <i className='fas fa-star' />
        <div id='starsInner' style={stylesInner}>
          <i className='fas fa-star' />
          <i className='fas fa-star' />
          <i className='fas fa-star' />
          <i className='fas fa-star' />
          <i className='fas fa-star' />
        </div>
      </div>
    </div>
  )
}

export default ProductStarsComponent
