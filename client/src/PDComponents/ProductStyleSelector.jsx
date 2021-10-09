import React from 'react'
import StyleSelectorItem from './StyleSelectorItem.jsx'
import './styles/ProductStyleSelector.css'
import { SkeletonLine } from '../components/Shared/SSkeleton.jsx'

const ProductStyleComponent = (props) => {
  const handleSelectorClick = (e) => {
    const index = e.target.getAttribute('data-index')
    props.updateSelectedStyle(index)
  }

  let styleSelectors = []

  if (props.styles) {
    styleSelectors = props.styles.map((style, index) => (
      <StyleSelectorItem key={index} index={index} style={style} handleSelectorClick={handleSelectorClick} />
    ))
  } else {
    const temp = []
    for (let i = 0; i <= 5; i++) {
      temp.push(<StyleSelectorItem key={i} index={i} style={null} handleSelectorClick={() => {}} />)
    }
    styleSelectors = temp
  }

  return (
    <div>
      <h4 id='style-selector-title'> <b>STYLE {'>'} </b>{props.selectedStyle.name || <SkeletonLine />}</h4>
      <div style={{ display: 'flex', maxWidth: '300px', flexWrap: 'wrap' }}>{styleSelectors} </div>
    </div>
  )
}

export default ProductStyleComponent
