import React from 'react';
import '../cssFiles/addReview.css';

const AddReviewsRecommended = () => {
  return (
  <div className="addReviewItem">
    <input type="radio" id="yesRecommend" name="yesRecommend" value="Yes" defaultChecked/>
    <label htmlFor="yesRecommend">Yes</label><br></br>
    <input type="radio" id="noRecommend" name="yesRecommend" value="No"/>
    <label htmlFor="noRecommend"> No</label>
    <br></br>
  </div>
  )

}

export default AddReviewsRecommended