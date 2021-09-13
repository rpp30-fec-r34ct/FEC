import React from "react";
import ProductStars from "./ProductStars.jsx";
import ProductStyleSelector from "./ProductStyleSelector.jsx";

const ProductDescriptionComponent = (props) => {

  let styles = {
    "display": "flex",
    "flexDirection": "column",
    "marginLeft": "20px"
  }
  return(
    <div style={styles}>
      <ProductStars />
      <h4>{props.productDetails.category}</h4>
      <h2>{props.productDetails.name}</h2>
      <p>${props.productDetails.default_price}</p>
      <ProductStyleSelector styles={props.styles} selectedStyle={props.selectedStyle}/>
    </div>
  )
}

export default ProductDescriptionComponent