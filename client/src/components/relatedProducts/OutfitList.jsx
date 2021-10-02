import React, { useState } from 'react'
import AddCard from './AddCard.jsx'
import OutfitCard from './OutfitCard.jsx'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/Ri'

export default function OutfitList(props) {
  const [userOutfits, setUserOutfits] = useState([])
  const { productId } = useParams()


  const addOutfit = () => {
    const userOutfits = JSON.parse(window.localStorage.getItem('FECOutfit')) || []

    if (!userOutfits.includes(parseInt(productId))) {
      userOutfits.push(parseInt(productId))
      window.localStorage.setItem('FECOutfit', JSON.stringify(userOutfits))
    }
    setUserOutfits(userOutfits)
  }

  const deleteOutfit = () => {
    window.localStorage.removeItem(parseInt(productId))

  }



  return (
    <div className='outfit-overview'>
      <h3>YOUR OUTFIT</h3>
      <div className='outfit-carousel-wrapper'>
        <RiArrowLeftSLine className='left-arrow' />
        <div className='outfit-container'>
          <div className='outfit-list'>
            <div className='outfit-content'>
              <AddCard addOutfit={addOutfit} />
              {/* <OutfitCard /> */}
              <RiArrowRightSLine className='right-arrow' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
