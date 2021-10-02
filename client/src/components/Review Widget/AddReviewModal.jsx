import React, { useState, useEffect }  from 'react';
import './cssFiles/reviewSection.css';
import axios from 'axios'
import CharacteristicsBar from './CharacteristicsBar.jsx'

const AddReviewModal = (props) => {
    const [productName, setProductName] = useState('');

    useEffect (() => {
      getProductName(props.productId)
    }, [props.productId])

  const modalContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    border: 'solid 2px coral',
    width: '90%',
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
    margin: 'auto'
  }

  const closeOutIconStyle = {
    color: 'black'
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
      characteristics.push(<CharacteristicsBar key={key} characteristic={key}/>)
    }
    return characteristics;
  }

  if (props.isAddReview === 0) {
    return null
  } else {
    return (
      <>
        <div style={pageCoverStyle} />
        <div data-testid='testModalContainer' style={modalContainerStyle}>
        <span>{'Write Your Review'}</span><br/>
        <span>{'About the ' + productName}</span>
          <form style={reviewFormStyle}>
            <label> Overall Rating*
              <input type="text" />
            </label>
            <div>
              <p>Do you recommend this product?</p>
              <input type="radio" id="yesRecommend" name="yesRecommend" value="Yes"/>
              <label htmlFor="yesRecommend">Yes</label><br></br>
              <input type="radio" id="noRecommend" name="noRecommend" value="No"/>
              <label htmlFor="noRecommend"> No</label><br></br>
            </div>
            <div>
              <label> Characteristics*
                <div>{getCharacteristics(props.reviewsMeta)}</div>
              </label>
            </div>
            <div>
              <label> Review Summary
                <input type="text" style={{color: 'grey', opacity:'0.6'}}/>
              </label>
            </div>
            <div>
              <label> Review Body
                <input type="text"/>
              </label>
            </div>

            {/* <label> Review Body *
              <input type="text" />
            </label>
            <label> Upload your photos
              <input type="text" />
            </label>
            <label> What is your nickname? *
              <input type="text" />
            </label>
            <label> Your email *
              <input type="text" />
            </label>
            <input type="submit" value="Submit" /> */}
          </form>
          <i className='fas fa-times' onClick={props.onAddReviewClick} style={closeOutIconStyle} />
        </div>
      </>
    )
  }

}

export default AddReviewModal