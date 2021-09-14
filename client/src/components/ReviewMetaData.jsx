import React, { useState, useEffect } from 'react';
import AverageRating from './AverageRating.jsx';

const ReviewMetaData = (props) => {
  const [average, setAverage] = useState(0);

  useEffect(() => {
    calculateAverage();
  }, []);

  const calculateAverage = () => {
    let currentAverage = 0;

    for (var key in props.ratings) {
      currentAverage = currentAverage + parseInt(key) * parseInt(props.ratings[key]);
    }
    setAverage(currentAverage)
  };

  return (
    <div>
      <h1>loaded</h1>
      <AverageRating average={average}/>
      {/* <RatingBreakdown ratings={props.ratings}/>
      <ProductCharacteristics characteristics={props.characteristics}/> */}
    </div>
  )
};

export default ReviewMetaData