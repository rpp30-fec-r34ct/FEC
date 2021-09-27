import React from 'react';
import './cssFiles/reviewSection.css'


const ReviewSortDropDown = (props) => {

  const getSortOptions = (sortType) => {
    const sortOptions = ['helpful', 'newest', 'relevance'];
    let options = [];

    for (var i = 0; i < sortOptions.length; i++) {
      if (sortOptions[i] !== sortType) {
        options.push(<span key={i}>{sortOptions[i]}</span>)
      }
    }

    return options
  }

  return (
    <div className="dropDownContainer">
      <button className="dropDownBtn">{props.sortType}</button>
      <div className="dropDownList">
        {getSortOptions(props.sortType)}
      </div>
      <i className="fas fa-caret-down"></i>
    </div>
  )
}

export default ReviewSortDropDown