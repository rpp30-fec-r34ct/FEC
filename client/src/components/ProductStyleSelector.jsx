import React, { useState, useEffect } from "react";

import axios from "axios";
const ProductStyleComponent = (props) => {
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSeleectedStyle] = useState({})

  const getStyles = () => {
    axios.get(`/api/products/${props.productId}/styles`)
      .then(res => {
        setStyles(res.data.results);
        setSeleectedStyle(res.data.results[0]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(()=> {
    getStyles();
  }, [])
  return (
    <div>
      <h2> <b>style {'>'} </b>{selectedStyle.name}</h2>
    </div>
  )
}

export default ProductStyleComponent;