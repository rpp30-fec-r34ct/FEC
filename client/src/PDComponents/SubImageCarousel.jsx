import React, { useState } from 'react'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'

const SubImageCarouselComponent = ({ thumbnails }) => {
  const [topIndex, setTopIndex] = useState(0)

  const listStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden'
  }

  const carouselListStyles = {
    transform: `translateY(-${topIndex * 77}px)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }

  const handleCarouselUpClick = () => {
    setTopIndex(prevIndex => {
      return prevIndex - 1
    })
  }

  const handleCarouselDownClick = () => {
    setTopIndex(prevIndex => {
      return prevIndex + 1
    })
  }

  return(
    <div style={listStyles}>
    {(topIndex > 0) ? <FaChevronUp className='up-arrow' onClick={handleCarouselUpClick} /> : <FaChevronUp className='hidden' />}
    <div style={{ maxHeight: '395px', overflow: 'hidden' }}>
      <div style={carouselListStyles}>
        {thumbnails}
      </div>
    </div>
    {(topIndex < thumbnails.length - 5) ? <FaChevronDown className='down-arrow' onClick={handleCarouselDownClick} /> : <FaChevronDown className='hidden' />}
  </div>
  )
}

export default SubImageCarouselComponent
