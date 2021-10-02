import React, { useState, useEffect } from 'react'
import AddCard from './AddCard.jsx'
import OutfitCard from './OutfitCard.jsx'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function OutfitList({currentProduct, prevCard, nextCard}) {
  const [userOutfits, setUserOutfits] = useState([])
  const [currentPosition, setCurrentPosition] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)


//Initialize outfit list array based on local storage data
  useEffect(() => {
    setUserOutfits(JSON.parse(window.localStorage.getItem('outfit')))
  }, [])

  //Edit the local storage array if the outfit list changes using dependency array
  useEffect(() => {
    window.localStorage.setItem('outfit', JSON.stringify(userOutfits))
  }, [userOutfits]) //Runs only when userOutfits changes


  const addOutfit = () => {
    const temp = JSON.parse(window.localStorage.getItem('outfit')) || []
    //Prevent re-adding same product if already in list
    if (!temp.find((outfit) => outfit.id === currentProduct.id)) {
      temp.push(currentProduct)
      window.localStorage.setItem('outfit', JSON.stringify(temp))
    }
    setUserOutfits(temp)
  }

  const deleteOutfit = () => {
    //get the item from the local storage from userlist
    const oldTemp = JSON.parse(window.localStorage.getItem('outfit'))

//delete the specific item
    // const newTemp = oldTemp.filter((outfit) => outfit.id !== )

    //re-serialize to local storage
    window.localStorage.setItem('outfit', JSON.stringify(newTemp))

    //update the state to reflect
    //setUserOutfits(newTemp)
  }



  return (
    <div className='outfit-carousel-wrapper'>
      {currentPosition < 0 && <FaChevronLeft className='left-arrow' onClick={prevCard} />}
        <div className='outfit-container'>
          <div className='outfit-list'>
            <div className='outfit-content'>
              <AddCard addOutfit={addOutfit} />
              {
                userOutfits.map((outfit) => <OutfitCard key={outfit.id} outfit={outfit}/>)
              }
        </div>
      </div>
      {userOutfits.length > 4 && currentIndex < (userOutfits.length - 4) && <FaChevronRight className='right-arrow' onClick={nextCard} />}
      </div>
    </div>
  )
}
