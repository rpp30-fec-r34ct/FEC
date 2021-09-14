import React from 'react'

const ProductStarsComponent = (props) => {
  // const stars = <i class='fas fa-star' />

  // const totalStars = 5
  // const tempRating = 4.25
  // const fillPercentage = (tempRating / totalStars) * 100

  const stylesOuter = {
    fontFamily: 'Font Awesome Free',
    fontWeight: 900,
    color: 'black'
  }

  return (
    <div>
      <div id='starsOuter' style={stylesOuter}>
        <i className='fas fa-star' />
        <i className='fas fa-star' />
        <i className='fas fa-star' />
        <i className='fas fa-star' />
        <i className='fas fa-star' />
      </div>
    </div>
  )
}

export default ProductStarsComponent
