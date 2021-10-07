import React from 'react'
import '../cssFiles/addReview.css'

const CharacteristicsBar = (props) => {
  const getRatingTitle = (characteristic, rating) => {
    if (characteristic === 'Size') {
      switch (rating) {
        case 1:
          return 'A size too small'

        case 2:
          return '1/2 a size too small'

        case 3:
          return 'Perfect'

        case 4:
          return '1/2 a size too big'

        case 5:
          return 'A size too big'

        default:
          return '[size] No rating string'
      }
    } else if (characteristic === 'Width') {
      switch (rating) {
        case 1:
          return 'Too narrow'

        case 2:
          return 'Slightly narrow'

        case 3:
          return 'Perfect'

        case 4:
          return 'Slightly Wide'

        case 5:
          return 'Too Wide'

        default:
          return '[width] No rating string'
      }
    } else if (characteristic === 'Comfort') {
      switch (rating) {
        case 1:
          return 'Uncomfortable'

        case 2:
          return 'Slightly uncomfortable'

        case 3:
          return 'Ok'

        case 4:
          return 'Comfortable'

        case 5:
          return 'Perfect'

        default:
          return '[Comfort] No rating string'
      }
    } else if (characteristic === 'Quality') {
      switch (rating) {
        case 1:
          return 'Poor'

        case 2:
          return 'Below Average'

        case 3:
          return 'What I expected'

        case 4:
          return 'Pretty Great'

        case 5:
          return 'Perfect'

        default:
          return '[Quality] No rating string'
      }
    } else if (characteristic === 'Length') {
      switch (rating) {
        case 1:
          return 'Runs short'

        case 2:
          return 'Runs slightly short'

        case 3:
          return 'Perfect'

        case 4:
          return 'Runs slightly long'

        case 5:
          return 'Runs long'

        default:
          return '[Length] No rating string'
      }
    } else {
      switch (rating) {
        case 1:
          return 'Runs tight'

        case 2:
          return 'Runs slightly tight'

        case 3:
          return 'Perfect'

        case 4:
          return 'Runs slightly long'

        case 5:
          return 'Runs long'

        default:
          return '[Fit] No rating string'
      }
    }
  }

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
    <div className='characteristicBar' style={{ background: 'lightblue', border: '2px solid grey' }}>
      <span style={{ marginLeft: '2px' }}>{props.characteristic + ': '}</span>
      <br />
      <div id={props.characteristic} style={characteristicBarStyle}>
        <div style={characteristicDescriptionStyle}>
          <input onChange={props.handleCharacteristicChange} className='characteristicRadio' type='radio' id='1' name={props.characteristic_id} value={getRatingTitle(props.characteristic, 1)} />
          <label style={characteristicRatingsStyle} htmlFor={props.characteristic_id}>{getRatingTitle(props.characteristic, 1)}</label><br />
        </div>
        <div style={characteristicDescriptionStyle}>
          <input onChange={props.handleCharacteristicChange} className='characteristicRadio' type='radio' id='2' name={props.characteristic_id} value={getRatingTitle(props.characteristic, 2)} />
          <label style={characteristicRatingsStyle} htmlFor={props.characteristic_id}>{getRatingTitle(props.characteristic, 2)}</label><br />
        </div>
        <div style={characteristicDescriptionStyle}>
          <input onChange={props.handleCharacteristicChange} className='characteristicRadio' type='radio' id='3' name={props.characteristic_id} value={getRatingTitle(props.characteristic, 3)} />
          <label style={characteristicRatingsStyle} htmlFor={props.characteristic_id}>{getRatingTitle(props.characteristic, 3)}</label><br />
        </div>
        <div style={characteristicDescriptionStyle}>
          <input onChange={props.handleCharacteristicChange} className='characteristicRadio' type='radio' id='4' name={props.characteristic_id} value={getRatingTitle(props.characteristic, 4)} />
          <label style={characteristicRatingsStyle} htmlFor={props.characteristic_id}>{getRatingTitle(props.characteristic, 4)}</label><br />
        </div>
        <div style={characteristicDescriptionStyle}>
          <input onChange={props.handleCharacteristicChange} className='characteristicRadio' type='radio' id='5' name={props.characteristic_id} value={getRatingTitle(props.characteristic, 5)} />
          <label style={characteristicRatingsStyle} htmlFor={props.characteristic_id}>{getRatingTitle(props.characteristic, 5)}</label><br />
        </div>
      </div>
    </div>
  )
}

export default CharacteristicsBar
