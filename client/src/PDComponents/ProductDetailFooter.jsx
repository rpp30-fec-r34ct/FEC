import React from 'react'

const ProductDetailFooterComponent = ({ productDetails }) => {
  const footerStyles = {
    display: 'flex',
    alignItems: 'space-around'
  }

  const descriptionStyles = {
    borderRight: 'solid',
    paddingRight: '10px',
    marginRight: '10px',
    maxWidth: '500px'
  }
  return (
    <div style={footerStyles}>
      <div>
        {productDetails.slogan && <h4>{productDetails.slogan}</h4>}
        {productDetails.description && <p style={descriptionStyles}>{productDetails.description}</p>}
      </div>
      <div>
        {productDetails.features.map((entry, index) => {
          return <p key={index}> {entry.feature} : {entry.value} </p>
        })}
      </div>
    </div>
  )
}

export default ProductDetailFooterComponent
