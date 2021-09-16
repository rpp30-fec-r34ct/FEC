import React from 'react';
import quarterStar from './icons/star-one-quarter.svg';
import fullStar from './icons/star.svg';
import halfStar from './icons/star-half.svg';
import threeQuarterStar from './icons/star-three-quarter.svg';

const ReviewStars = (props) => {

  let wholeStars = [...Array(Math.floor(props.starRating))];
  let decimalStars = [];
  let decimalRating = props.starRating % 1;

  for (var i = 0; i < wholeStars.length; i++) {
    wholeStars[i] = <img src={fullStar}/>;
  }

  if (decimalRating > 0 && decimalRating <= 0.3) {
    decimalStars.push(<img src={quarterStar} />)
  } else if (decimalRating > 0.3 && decimalRating <= 0.6) {
    decimalStars.push(<img src={halfStar} />);
  } else if (decimalRating > 0.6 && decimalRating <= 0.9) {
    decimalStars.push(<img src={threeQuarterStar} />);
  }

  return (
    <div>{wholeStars.concat(decimalStars)}</div>
  );
};

export default ReviewStars;