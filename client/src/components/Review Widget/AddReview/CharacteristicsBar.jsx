import React from 'react'
import '../cssFiles/addReview.css'
import helpers from '../../Shared/helpers.js'

const CharacteristicsBar = (props) => {
  const characteristicBarStyle = {
    display: 'flex',
    flexDirection: 'row',
    padding: '10px',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto'
  }

  const characteristicDescriptionStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '15px'
  }

  const characteristicRatingsStyle = {
    fontSize: '15px',
    fontWeight: 'bold',
    fontStyle: 'italic'
  }

  return (
    <div data-testid='testCharacteristcBar' className='characteristicBar' style={{ background: 'lightblue', border: '2px solid grey' }}>
      <span style={{ marginLeft: '2px' }}>{props.characteristic + ': '}</span>
      <br />
      <div id={props.characteristic} style={characteristicBarStyle}>
        <div style={characteristicDescriptionStyle}>
          <input data-testid='testRadioBar' onChange={props.handleCharacteristicChange} className='characteristicRadio' type='radio' id='1' name={props.characteristic_id} value={helpers.getRatingTitle(props.characteristic, 1)} />
          <label style={characteristicRatingsStyle} htmlFor={props.characteristic_id}>{helpers.getRatingTitle(props.characteristic, 1)}</label><br />
        </div>
        <div style={characteristicDescriptionStyle}>
          <input onChange={props.handleCharacteristicChange} className='characteristicRadio' type='radio' id='2' name={props.characteristic_id} value={helpers.getRatingTitle(props.characteristic, 2)} />
          <label style={characteristicRatingsStyle} htmlFor={props.characteristic_id}>{helpers.getRatingTitle(props.characteristic, 2)}</label><br />
        </div>
        <div style={characteristicDescriptionStyle}>
          <input onChange={props.handleCharacteristicChange} className='characteristicRadio' type='radio' id='3' name={props.characteristic_id} value={helpers.getRatingTitle(props.characteristic, 3)} />
          <label style={characteristicRatingsStyle} htmlFor={props.characteristic_id}>{helpers.getRatingTitle(props.characteristic, 3)}</label><br />
        </div>
        <div style={characteristicDescriptionStyle}>
          <input onChange={props.handleCharacteristicChange} className='characteristicRadio' type='radio' id='4' name={props.characteristic_id} value={helpers.getRatingTitle(props.characteristic, 4)} />
          <label style={characteristicRatingsStyle} htmlFor={props.characteristic_id}>{helpers.getRatingTitle(props.characteristic, 4)}</label><br />
        </div>
        <div style={characteristicDescriptionStyle}>
          <input onChange={props.handleCharacteristicChange} className='characteristicRadio' type='radio' id='5' name={props.characteristic_id} value={helpers.getRatingTitle(props.characteristic, 5)} />
          <label style={characteristicRatingsStyle} htmlFor={props.characteristic_id}>{helpers.getRatingTitle(props.characteristic, 5)}</label><br />
        </div>
      </div>
    </div>
  )
}

export default CharacteristicsBar
