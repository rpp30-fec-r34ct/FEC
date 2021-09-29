import React from 'react'

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

  if (props.activeModal === '') {
    return null
  } else {
    return (
      <>
        <div style={pageCoverStyle} />
        <div data-testid='testModalContainer' style={modalContainerStyle}>
          <div style={imgContainerStyle}>
            <img src={props.activeModal} style={imgStyle} />
          </div>
          <i className='fas fa-times' onClick={props.onClickClose} style={{ color: 'black' }} />
        </div>
      </>
    )
  }
}

export default ModalContainer
