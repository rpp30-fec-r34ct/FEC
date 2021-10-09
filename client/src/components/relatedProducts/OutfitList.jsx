import React, { useState, useEffect } from 'react'
import AddCard from './AddCard.jsx'
import OutfitCard from './OutfitCard.jsx'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function OutfitList ({ currentOverview }) {
  const [userOutfits, setUserOutfits] = useState([])
  const [outfitPosition, setOutfitPosition] = useState(0)
  const [outfitIndex, setOutfitIndex] = useState(0)

  useEffect(() => {
    setUserOutfits(JSON.parse(window.localStorage.getItem('outfit')) || [])
  }, [])

  // Edit the local storage array ONLY the outfit list changes using dependency array
  useEffect(() => {
    window.localStorage.setItem('outfit', JSON.stringify(userOutfits))
  }, [userOutfits])

  const addOutfit = () => {
    const temp = JSON.parse(window.localStorage.getItem('outfit'))
    if (!temp.find((outfit) => outfit.id === currentOverview.id)) {
      temp.push(currentOverview)
      window.localStorage.setItem('outfit', JSON.stringify(temp))
    }
    setUserOutfits(temp)
  }

  const deleteOutfit = (selectedId) => {
    const oldTemp = JSON.parse(window.localStorage.getItem('outfit'))
    const newTemp = oldTemp.filter(outfit => outfit.id !== selectedId)
    setUserOutfits(newTemp)
  }

  const nextOutfit = () => {
    setOutfitIndex(outfitIndex => outfitIndex + 1)
    setOutfitPosition(outfitPosition - 220)
  }

  const prevOutfit = () => {
    setOutfitIndex(outfitIndex => outfitIndex - 1)
    setOutfitPosition(outfitPosition + 220)
  }

  return (
    <>
      <h3 style={{ marginTop: '5px' }} className='outfit-list-header-1'>YOUR OUTFIT</h3>
      <div className='outfit-list'>
        <div className='carousels-overview'>
          <div className='carousel-container' style={{width: '870px' }}>
            <AddCard addOutfit={addOutfit} style={{ display: 'inline' }} />
            {outfitPosition < 0 && <FaChevronLeft className='left-arrow' onClick={prevOutfit} aria-hidden='true'/>}
            <div className='carousel-content-wrapper'>
              <div className='carousel-content' style={{ transform: `translateX(-${outfitIndex * 35}%)` }}>
                {
                    userOutfits.map((outfit) => <OutfitCard key={outfit.id} outfit={outfit} deleteOutfit={deleteOutfit} />)
                  }
              </div>
            </div>
            {userOutfits.length > 3 && outfitIndex + 2 < (userOutfits.length - 1) && <FaChevronRight className='right-arrow' onClick={nextOutfit} aria-hidden='true'/>}
          </div>
      </div>
    </div>
    </>
  )
}
