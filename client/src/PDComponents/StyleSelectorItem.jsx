import React from 'react'
import { SkeletonCircle } from '../components/Shared/SSkeleton.jsx'

const StylesSelectorItemComponent = (props) => {
  const styles = {
    height: '50px',
    width: '50px',
    borderRadius: '50%',
    border: 'solid, 1px, black',
    margin: '2px'
  }
  return (
    <>
      {props.style
        ? (
          <>
            {props.style.photos[0].thumbnail_url
              ? <img style={styles} src={props.style.photos[0].thumbnail_url} data-index={props.index} onClick={props.handleSelectorClick} />
              : <div style={styles}> <SkeletonCircle /> </div>}
          </>)
        : <div style={styles}> <SkeletonCircle /> </div>}
    </>
  )
}

export default StylesSelectorItemComponent
