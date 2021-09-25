import React from 'react';
import './cssFiles/productBreakdown.css'
import ProductBreakDownBar from './ProductBreakDownBar.jsx';


const ProductBreakdown = (props) => {

  if (props === undefined) {
    return null;
  }

  const getRatingName = (charName, valueType) => {
    if (charName === 'Size') {
      return (valueType === 'low' ? 'A size too small' : 'A size too wide');
    } else if (charName === 'Width') {
      return (valueType === 'low' ? 'A size too small' : 'A size too wide');
    } else if (charName === 'Comfort') {
      return (valueType === 'low' ? 'Uncomfortable' : 'Perfect');
    } else if (charName === 'Quality') {
      return (valueType === 'low' ? 'Poor' : 'Perfect');
    } else if (charName === 'Length') {
      return (valueType === 'low' ? 'Runs short' : 'Runs long');
    } else {
      return (valueType === 'low' ? 'Runs tight' : 'Runs long');
    }
  }

  let breakDownComponents = [];

  for (var key in props.characteristicsData) {
    breakDownComponents.push(
      <div data-testid='testProductBreakdown' className="productBreakDownSection" key={key}>
        <span className="productBreakDownTitle">{key}</span><br></br>
        <ProductBreakDownBar rating={props.characteristicsData[key].value}/>
        <div className="productBreakDownLimitHolder">
          <span className="productBreakDownLimit">{getRatingName(key, 'low')}</span>
          <span className="productBreakDownLimit">{getRatingName(key, 'high')}</span>
        </div>
      </div>
    )
  }

  return (
    <>{breakDownComponents}</>
  )
}

export default ProductBreakdown;