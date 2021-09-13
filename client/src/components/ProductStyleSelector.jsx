import React, { useState, useEffect } from "react";
import StyleSelectorItem from './StyleSelectorItem.jsx';

import axios from "axios";
const ProductStyleComponent = (props) => {
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState({})
  const [styleSelectors, setStyleSelectors] = useState([])

  const getStyles = () => {
    axios.get(`/api/products/${props.productId}/styles`)
      .then(res => {
        setStyles(res.data.results);
        setSelectedStyle(res.data.results[0]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(()=> {
    getStyles();
  }, [])

  useEffect(()=> {
    if (styles.length > 0) {
      let newStyleSelectors = styles.map((style, index) => (
        <StyleSelectorItem key={index} style={style}/>
      ));
      setStyleSelectors(newStyleSelectors);
    }
  }, [styles])


  return (
    <div>
      <h2> <b>style {'>'} </b>{selectedStyle.name}</h2>
      {styleSelectors}
    </div>
  )
}

export default ProductStyleComponent;