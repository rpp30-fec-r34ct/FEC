/* eslint-disable */
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const ModalContainer = (props) => {
  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  }

  const imgContainerStyle = {
    width: '60%',
    height: '600px',
    overflow: 'hidden',
    margin: 'auto',
    objectFit: 'cover'
  }

  const modalContainerStyle = {
    display: 'flex',
    border: 'solid 2px coral',
    width: '70%',
    height: '650px',
    margin: 'auto',
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

  if (props.activeModal === '') {
    return null
  } else {
    return (
      <>
        <div style={pageCoverStyle} />
        <div data-testid='testModalContainer' style={modalContainerStyle}>
          <div style={imgContainerStyle}>
            <img src={props.activeModal} alt="modal-container" style={imgStyle} />
          </div>
          <AiOutlineClose onClick={props.onClickClose}/>
        </div>
      </>
    )
  }
}

export default ModalContainer
