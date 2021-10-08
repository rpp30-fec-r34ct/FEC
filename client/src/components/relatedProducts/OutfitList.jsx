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
          <div className='carousel-container' style={{ width: '100%', maxWidth: '675px' }}>
            <AddCard addOutfit={addOutfit} style={{ display: 'inline' }} />
            <div className='carousel-content-wrapper'>
            {outfitPosition < 0 && <FaChevronLeft className='left-arrow' onClick={prevOutfit} />}
              <div className='carousel-content' style={{ transform: `translateX(-${outfitIndex * 31}%)` }}>
                {
                    userOutfits.map((outfit) => <OutfitCard key={outfit.id} outfit={outfit} deleteOutfit={deleteOutfit} />)
                  }
              </div>
            </div>
          </div>
        </div>
            {userOutfits.length > 3 && outfitIndex < (userOutfits.length - 3) && <FaChevronRight className='right-arrow' onClick={nextOutfit} />}
      </div>
    </>
  )
}
