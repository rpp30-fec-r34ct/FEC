/* eslint-disable */
import React from 'react'
import './cssFiles/reviewSection.css'

const ReviewSortDropDown = (props) => {
  const getSortOptions = (sortType) => {
    const sortOptions = ['helpful', 'newest', 'relevance']
    const options = []

    for (let i = 0; i < sortOptions.length; i++) {
      if (sortOptions[i] !== sortType) {
        options.push(<span onClick={props.onSortTypeChange} key={i}>{sortOptions[i]}</span>)
      }
    }

    return options
  }

  return (
    <div data-testid='testReviewSortDropDown' className='dropDownContainer'>
      <button className='dropDownBtn'>{props.sortType}</button>
      <div className='dropDownList'>
        {getSortOptions(props.sortType)}
      </div>
      <i className='fas fa-caret-down' />
    </div>
  )
}

export default ReviewSortDropDown
