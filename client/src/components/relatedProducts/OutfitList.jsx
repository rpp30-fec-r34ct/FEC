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
    // if (!userOutfits.includes(productId)) {
    //   userOutfits.push(productId)
    // }
    // setUserOutfits(userOutfits)
  }

  const deleteOutfit = () => {
    // window.localStorage.removeItem(productId)

  }



  return (
    <div className='outfit-overview'>
      <h3>YOUR OUTFIT</h3>
      <div className='outfit-container'>
        <RiArrowLeftSLine className='left-arrow' />
        <div className='outfit-carousel-wrapper'>
          <div className='outfit-list'>
            <div className='outfit-content'>
              <AddCard />
              <OutfitCard />
            </div>
          </div>
        </div>
        <RiArrowRightSLine className='right-arrow' />
      </div>
    </div>
  )
}
