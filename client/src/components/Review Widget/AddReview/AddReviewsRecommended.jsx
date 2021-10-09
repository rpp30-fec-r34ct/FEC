import React from 'react'
import '../cssFiles/addReview.css'

const AddReviewsRecommended = (props) => {
  return (
    <div data-testid='testAddReviewItem' className='addReviewItem'>
      <input data-testid='testyesRecommend' onChange={props.handleReviewRecommendChange} type='radio' id='yesRecommend' name='yesRecommend' value='Yes' defaultChecked />
      <label htmlFor='yesRecommend'>Yes</label><br />
      <input data-testid='testnoRecommend' onChange={props.handleReviewRecommendChange} type='radio' id='noRecommend' name='yesRecommend' value='No' />
      <label htmlFor='noRecommend'> No</label>
      <br />
    </div>
  )
}

export default AddReviewsRecommended
