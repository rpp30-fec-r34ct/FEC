import React, { useState, useEffect }  from 'react';
import '../cssFiles/addReview.css';
import axios from 'axios'
import CharacteristicsBar from './CharacteristicsBar.jsx';
import AddReviewStars from './AddReviewStars.jsx';
import helpers from '../../Shared/helpers.js';
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


  //onChange/onClick functions
  const handleCharacteristicChange = (event) => {
    console.log(event);
    let newState = {};
    Object.assign(newState, characteristicsToSend);
    newState[event.target.name] = event.target.id;
    setCharacteristicsToSend(newState);
  }

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

  //for re-rednering when the name changes
  useEffect (() => {
    getProductName(props.productId)
  }, [props.productId])

  //for getting information needed from the server that isn't passed in via props
  const getProductName = async (id) => {
    try {
      const { data } = await axios.get('/productDetail' + id)
      setProductName(data.name)
    }
    catch (error) {
      console.error(error);
    }
  }


  //for putting the characteristics together
  const getCharacteristics = (reviewsMeta) => {
    let characteristics = [];
    for (let key in reviewsMeta.characteristics) {
      characteristics.push(<CharacteristicsBar key={key} handleCharacteristicChange={handleCharacteristicChange} characteristic={key} characteristic_id={reviewsMeta.characteristics[key].id}/>)
    }
    return characteristics;
  }

  //for validating the form entries
  const checkForValidEntries = () => {
    /*criteria:
      star rating: filled in
      recommended: filled in (defaulted so no need to check)
      characteristics: filled in
      review body: > 50 characters
      email: filled in
      nickname: filled in
    */
    let invalidEntries = [];

    if (helpers.getFormStarRating() === '') {
      invalidEntries.push('Overall Rating')
    }
    if (Object.keys(characteristicsToSend).length === 0) {
      invalidEntries.push('Characteristics');
    }
    if (reviewBody.length < 50) {
      invalidEntries.push('Review Body (must be at least 50 characters)');
    }
    if (reviewEmail === '' || reviewEmail.indexOf('@') === -1) {
      invalidEntries.push('Email (must contain an @)')
    }
    if (reviewNickName === '') {
      invalidEntries.push('Nickname');
    }

    return invalidEntries;
  }

  const onAddReviwSubmit = (event) => {
    event.preventDefault();

    let invalidEntries = checkForValidEntries();
    let invalidString = 'Please fill in the follwing: '

    if (invalidEntries.length !== 0) {
      for (let i = 0; i < invalidEntries.length; i++) {
        if (i + 1 !== invalidEntries.length) {
          invalidString = invalidString + invalidEntries[i] + ' , ';
        } else {
          invalidString = invalidString + ' and ' + invalidEntries[i];
        }
      }
      alert(invalidString);
    } else {
      console.log('forms');
    }

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
              <AddReviewStars />
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
