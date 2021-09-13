import React from 'react';

const ProductDetailFooterComponent = (props) => {

  const footerStyles ={
    display: "flex",
    alignItems: "space-around"
  }

  const descriptionStyles = {
    "borderRight": "solid",
    "paddingRight": "10px",
    "marginRight": "10px",
    "maxWidth": "500px"
  }
  return(
    <div style={footerStyles}>
      <p style={descriptionStyles}>{props.productDetails.description}</p>
      <div>
        {props.productDetails.features.map((entry, index) => {
          return <p key={index}> {entry.feature} : {entry.value} </p>
        })}
      </div>
    </div>
  )
}

export default ProductDetailFooterComponent;