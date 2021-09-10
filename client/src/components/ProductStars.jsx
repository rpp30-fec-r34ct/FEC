import React from "react";

const ProductStarsComponent = (props) => {

  const stars = <i class="fas fa-star"></i>

  const totalStars = 5;
  let tempRating = 4.25;
  let fillPercentage = (tempRating / totalStars) * 100;

  let stylesOuter = {
    "fontFamily": "Font Awesome Free",
    "fontWeight": 900,
    "color": "black"
  }

  return (
    <div>
      <div id="starsOuter" style={stylesOuter}>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      </div>
    </div>
  )
}

export default ProductStarsComponent;