import React, { useState, useEffect }  from 'react';
import '../cssFiles/addReview.css';
import axios from 'axios'
import CharacteristicsBar from './CharacteristicsBar.jsx';
import AddReviewStars from './AddReviewStars.jsx';
import addReviewHelpers from './addReviewHelpers.js';
import AddReviewsRecommended from './AddReviewsRecommended.jsx';

const AddReviewModal = (props) => {
  const [productName, setProductName] = useState('');
  const [characterCount, setCharCount] = useState(0);

  //states for the form. everything but stars will have a state here:
  const [characteristicsToSend, setCharacteristicsToSend] = useState({});

  const [reviewSummary, setReviewSummary] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [reviewNickName, setReviewNickName] = useState('');
  const [reviewEmail, setReviewEmail] = useState('');

  const handleReviewChange = (event) => {

    switch (event.target.id) {
      case ('reviewSummary'):
        setReviewSummary(event.target.value);
        break;

      case('reviewBody'):
        setCharCount(event.target.value.length);
        setReviewBody(event.target.value);
        break;

      case ('reviewNickName'):
        setReviewNickName(event.target.value);
        break;

      case ('reviewEmail'):
        setReviewEmail(event.target.value);
        break;

      default:
        return;
    }
  }

  //onChange/onClick functions
  const handleCharacteristicChange = (event) => {
    console.log(event);
    let newState = {};
    Object.assign(newState, characteristicsToSend);
    newState[event.target.name] = event.target.id;
    setCharacteristicsToSend(newState);
  }

  useEffect (() => {
    getProductName(props.productId)
  }, [props.productId])

  const onStarRatingChange = (rating) => {
    setStarRating(rating)
  }

  const getProductName = async (id) => {
    try {
      const { data } = await axios.get('/productDetail' + id)
      setProductName(data.name)
    }
    catch (error) {
      console.error(error);
    }
  }

  const getCharacteristics = (reviewsMeta) => {
    let characteristics = [];
    for (let key in reviewsMeta.characteristics) {
      characteristics.push(<CharacteristicsBar key={key} handleCharacteristicChange={handleCharacteristicChange} characteristic={key} characteristic_id={reviewsMeta.characteristics[key].id}/>)
    }
    return characteristics;
  }

  const onReviewBodyChange = (event) => {
  }

  const onAddReviwSubmit = (event) => {
    event.preventDefault();

    // let invalidEntries = addReviewHelpers.checkForValidEntries();
      //check for invalid entries by running through the mandatory fields and determining
      //if any of the entries do not meet the required mandatory criteria.
      //you check all of them. if any of them do not meet the required criteria,
      //then we write an alert to the user that says "You must enter the following:
      /*
      product recommendation
      review body that is at least 50 characters
      email
      nickname
      overall rating


      and then in the radio buttons i need to make sure they can only select one of the radio buttons- > do this by keeping the name the same for the radios
      */



    let formRating = addReviewHelpers.getFormStarRating();
    let formRecommended = addReviewHelpers.getFormRecommended();
    let formCharacteristics = addReviewHelpers.getFormCharacteristics();
    let formReviewSummary = addReviewHelpers.getFormReviewSummary();
    let formReviewBody = addReviewHelpers.getFormReviewBody();
    let formReviewNickName = addReviewHelpers.getFormReviewNickName();
    let formReviewEmail = addReviewHelpers.getFormReviewEmail();

    console.log('forms');


    // let starRating = getOverviewStarRating();
    // axios.post('/addReview', {
    //   params:{
    //     starOverviewRating: 0,
    //     recommended: false,
    //     characteristics: [],
    //     reviewSummary: '',
    //     reviewBody: '',
    //     photos: [],
    //     nickName: '',
    //     email: ''
    //   }
    // })
  }

  const getCharCountDisplay = () => {
    return characterCount < 50 ? `Minimum required characters left: ${50 - characterCount}` : 'Minimum reached';
  }

  if (props.isAddReview === 0) {
    return null
  } else {
    return (
      <>
        <div className="addReviewPageCover" />
        <div data-testid='testModalContainer' className="addReviewModalContainer">
        <i className='fas fa-times' onClick={props.onAddReviewClick} style={{color: 'black', marginLeft: '97%'}}/>
          <span style={{fontSize:'25px', fontWeight: 'bold', margin: 'auto'}}>{'Write Your Review'}</span>
          <br></br>
          <span style={{fontSize:'20px', margin: '-25px auto'}}>{'About the ' + productName}</span>
          <form id="addReviewForm" className="reviewFormStyle">
            <label className="addReviewTitleStyle">1. Overall Rating: *</label>
              <AddReviewStars onStarRatingChange={onStarRatingChange}/>
            <div id="addReviewRecommend">
              <span className="addReviewTitleStyle">2. Do you recommend this product?: *</span>
              <br></br>
              <AddReviewsRecommended />
            </div>
            <div>
              <label className="addReviewTitleStyle">3. Characteristics: *</label>
              <div className="addReviewCharacteristics" >{getCharacteristics(props.reviewsMeta)}</div>
            </div>
            <div>
              <label className="addReviewTitleStyle">4. Review Summary:</label><br></br>
              <div className="addReviewItemStyle">
                <input id="reviewSummary" onChange={handleReviewChange} type="textarea" maxLength="60" placeholder="Example: Best purhcase ever!" style={{width: '90%', height: '30px', fontFamily: 'Playfair Display serif'}}/>
              </div>
            </div>
            <div>
              <label className="addReviewTitleStyle">5. Review Body: *</label><br></br>
              <div className="addReviewItemStyle">
                <textarea id="reviewBody" onChange={handleReviewChange} maxLength="1000" minLength="50" placeholder="Why did you like the product or not?" style={{width: '90%', height: '100px', fontFamily: 'Playfair Display serif'}}></textarea>
                <br></br>
                <span className="subTextStyle">{getCharCountDisplay()}</span>
              </div>
            </div>
            <div>
              <label className="addReviewTitleStyle">6. What is your nickname?: *</label><br></br>
              <div className="addReviewItemStyle">
                <input id="reviewNickName" onChange={handleReviewChange} type="text" maxLength="60" placeholder="Example: jackson11!" style={{width: '70%', fontFamily: 'Playfair Display serif'}}/>
                <br></br>
                <span className="subTextStyle">{'For privacy reasons, do not use your full name or email address'}</span>
              </div>
            </div>
            <div>
              <label className="addReviewTitleStyle">7. Your email: *</label><br></br>
              <div className="addReviewItemStyle">
                <input id="reviewEmail" onChange={handleReviewChange} type="text" maxLength="60" style={{width: '70%', fontFamily: 'Playfair Display serif'}} placeholder="Example: jackson11@email.com"/>
                <br></br>
                <span className="subTextStyle">{'For authentication reasons, you will not be not be emailed'}</span>
              </div>
            </div>
            <input className="removeFiltersBtn" type="submit" onClick={onAddReviwSubmit} value="Submit" />
          </form>
        </div>
      </>
    )
  }

}

export default AddReviewModal
