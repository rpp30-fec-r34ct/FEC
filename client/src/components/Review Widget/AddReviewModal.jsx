import React, { useState, useEffect }  from 'react';
import './cssFiles/reviewSection.css';
import axios from 'axios'
import CharacteristicsBar from './CharacteristicsBar.jsx';
import AddReviewStars from './AddReviewStars.jsx';
import addReviewHelpers from './addReviewHelpers.js';

const AddReviewModal = (props) => {
    const [productName, setProductName] = useState('');
    const [characterCount, setCharCount] = useState(0);

    useEffect (() => {
      getProductName(props.productId)
    }, [props.productId])


  const modalContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    border: 'solid 2px coral',
    width: '80%',
    height: '650px',
    margin: 'auto 15%',
    background: 'white',
    position: 'absolute',
    overflow: 'hidden',
    overflowY: 'scroll'
  }
  const pageCoverStyle = {
    left: '0px',
    top: '0px',
    width: '100%',
    height: '100%',
    background: 'black',
    opacity: '0.6',
    position: 'fixed'
  }

  const reviewFormStyle = {
    width: '95%',
    margin: '50px auto',

  }

  const closeOutIconStyle = {
    color: 'black',
    marginLeft: '97%'
  }

  const subTextStyle = {
    color: 'grey',
    opacity: '0.8',
    fontSize: '12px'
  }

  const addReviewTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '10px',
    padding: '5px'
  }

  const addReviewItemStyle = {
    marginLeft: '20px',
    marginBottom: '10px'
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
      characteristics.push(<CharacteristicsBar key={key} characteristic={key} characteristic_id={reviewsMeta.characteristics[key].id}/>)
    }
    return characteristics;
  }

  const onReviewBodyChange = (event) => {
    setCharCount(event.target.value.length);
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
    // if (charCount < 50) {
    //   return `Minimum required characters left: ${characterCount}`;
    // }

    return characterCount < 50 ? `Minimum required characters left: ${50 - characterCount}` : 'Minimum reached';
  }

  if (props.isAddReview === 0) {
    return null
  } else {
    return (
      <>
        <div style={pageCoverStyle} />
        <div data-testid='testModalContainer' style={modalContainerStyle}>
        <i className='fas fa-times' onClick={props.onAddReviewClick} style={closeOutIconStyle} />
          <span style={{fontSize:'25px', fontWeight: 'bold', margin: 'auto'}}>{'Write Your Review'}</span>
          <br></br>
          <span style={{fontSize:'20px', margin: '-25px auto'}}>{'About the ' + productName}</span>
          <form id="addReviewForm" style={reviewFormStyle}>
            <label style={addReviewTitleStyle}>1. Overall Rating: *</label>
              <AddReviewStars />
            <div id="addReviewRecommend">
              <span style={addReviewTitleStyle}>2. Do you recommend this product?: *</span>
              <br></br>
              <div style={addReviewItemStyle}>
                <input type="radio" id="yesRecommend" name="yesRecommend" value="Yes" defaultChecked/>
                <label htmlFor="yesRecommend">Yes</label><br></br>
                <input type="radio" id="noRecommend" name="yesRecommend" value="No"/>
                <label htmlFor="noRecommend"> No</label>
                <br></br>
              </div>
            </div>
            <div>
              <label style={addReviewTitleStyle}>3. Characteristics: *</label>
              <div id="addReviewCharacteristics" style={{width: '50%', margin: 'auto'}}>{getCharacteristics(props.reviewsMeta)}</div>
            </div>
            <div>
              <label style={addReviewTitleStyle}>4. Review Summary:</label><br></br>
              <div style={addReviewItemStyle}>
                <input type="textarea" maxLength="60" placeholder="Example: Best purhcase ever!" style={{width: '90%', height: '30px', fontFamily: 'Playfair Display serif'}}/>
              </div>
            </div>
            <div>
              <label style={addReviewTitleStyle}>5. Review Body: *</label><br></br>
              <div style={addReviewItemStyle}>
                <textarea onChange={onReviewBodyChange} maxLength="1000" minLength="50" placeholder="Why did you like the product or not?" style={{width: '90%', height: '100px', fontFamily: 'Playfair Display serif'}}></textarea>
                <br></br>
                <span style={subTextStyle}>{getCharCountDisplay()}</span>
              </div>
            </div>
            <div>
              <label style={addReviewTitleStyle}>6. What is your nickname?: *</label><br></br>
              <div style={addReviewItemStyle}>
                <input type="text" maxLength="60" placeholder="Example: jackson11!" style={{width: '70%', fontFamily: 'Playfair Display serif'}}/>
                <br></br>
                <span style={subTextStyle}>{'For privacy reasons, do not use your full name or email address'}</span>
              </div>
            </div>
            <div>
              <label style={addReviewTitleStyle}>7. Your email: *</label><br></br>
              <div style={addReviewItemStyle}>
                <input type="text" maxLength="60" style={{width: '70%', fontFamily: 'Playfair Display serif'}} placeholder="Example: jackson11@email.com"/>
                <br></br>
                <span style={subTextStyle}>{'For authentication reasons, you will not be not be emailed'}</span>
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
