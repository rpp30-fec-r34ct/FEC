import React, { useState, useEffect } from "react";
import StyleSelectorItem from './StyleSelectorItem.jsx';

import axios from "axios";
const ProductStyleComponent = (props) => {

  let styleSelectors = [];

  if (props.styles.length > 0) {
    styleSelectors = props.styles.map((style, index) => (
      <StyleSelectorItem key={index} style={style}/>
    ));
  }

  return (
    <div>
      <h2> <b>style {'>'} </b>{props.selectedStyle.name}</h2>
      {styleSelectors}
    </div>
  )
}

export default ProductStyleComponent;