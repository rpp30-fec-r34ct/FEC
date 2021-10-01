import React, { useState, useEffect }  from 'react';
import './cssFiles/reviewSection.css';
import axios from 'axios'

const AddReviewModal = (props) => {
    const [productName, setProductName] = useState('');

    useEffect (() => {
      getProductName(props.productId)
    }, [props.productId])

  const modalContainerStyle = {
    display: 'flex',
    border: 'solid 2px coral',
    width: '70%',
    height: '650px',
    margin: 'auto 15%',
    background: 'white',
    position: 'absolute'
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

  const getProductName = async (id) => {
    try {
      const { data } = await axios.get('/productDetail' + id)
      setProductName(data.name)
    }
    catch (error) {
      console.error(error);
    }
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
          <form >
            <label>
              <input type="text" />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <i className='fas fa-times' onClick={props.onAddReviewClick} style={{ color: 'black' }} />
        </div>
      </>
    )
  }

}

export default AddReviewModal
