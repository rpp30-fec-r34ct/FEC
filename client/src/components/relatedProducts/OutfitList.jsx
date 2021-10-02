import React, { useState, useEffect } from 'react'
import AddCard from './AddCard.jsx'
import OutfitCard from './OutfitCard.jsx'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useParams } from 'react-router-dom'

export default function OutfitList({currentProduct, prevCard, nextCard}) {
  const [userOutfits, setUserOutfits] = useState([])
  const [currentPosition, setCurrentPosition] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)


  useEffect(() => {
    setUserOutfits(JSON.parse(window.localStorage.getItem('outfit')))
  }, [])

  //Edit the local storage array ONLY the outfit list changes using dependency array
  useEffect(() => {
    window.localStorage.setItem('outfit', JSON.stringify(userOutfits))
  }, [userOutfits])


  const addOutfit = () => {
    const temp = JSON.parse(window.localStorage.getItem('outfit')) || []

    if (!temp.find((outfit) => outfit.id === currentProduct.id)) {
      temp.push(currentProduct)
      window.localStorage.setItem('outfit', JSON.stringify(temp))
    }
    setUserOutfits(temp)
  }

  const deleteOutfit = (selectedId) => {
    const oldTemp = JSON.parse(window.localStorage.getItem('outfit'))
    const newTemp = oldTemp.filter(outfit => outfit.id !== selectedId)

    setUserOutfits(newTemp)
  }

  return (
    <div className='outfit-carousel-wrapper'>
      {currentPosition < 0 && <FaChevronLeft className='left-arrow' onClick={prevCard} />}
        <div className='outfit-container'>
          <div className='outfit-list'>
            <div className='outfit-content'>
              <AddCard addOutfit={addOutfit} />
              {
                userOutfits.map((outfit) => <OutfitCard key={outfit.id} outfit={outfit} deleteOutfit={deleteOutfit}/>)
              }
        </div>
      </div>
      {userOutfits.length > 4 && currentIndex < (userOutfits.length - 4) && <FaChevronRight className='right-arrow' onClick={nextCard} />}
      </div>
    </div>
  )
}
