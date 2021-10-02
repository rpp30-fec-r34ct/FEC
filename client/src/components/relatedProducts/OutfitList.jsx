import React, { useState, useEffect } from 'react'
import AddCard from './AddCard.jsx'
import OutfitCard from './OutfitCard.jsx'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/Ri'

export default function OutfitList({currentProduct}) {
  const [userOutfits, setUserOutfits] = useState([])
  const { productId } = useParams()

//Initialize outfit list array based on local storage data
  useEffect(() => {
    setUserOutfits(JSON.parse(window.localStorage.getItem('outfit')))
  }, [])

  //Edit the local storage array if the outfit list changes
  useEffect(() => {
    window.localStorage.setItem('outfit', JSON.stringify(userOutfits))
  }, [userOutfits]) //Runs only when userOutfits changes


  const addOutfit = () => {
    const temp = JSON.parse(window.localStorage.getItem('outfit')) || []
    //Prevent readding same product if already in list
    if (!temp.find((outfit) => outfit.id === currentProduct.id)) {
      temp.push(currentProduct)
      window.localStorage.setItem('outfit', JSON.stringify(temp))
    }
    setUserOutfits(temp)
  }

  // const deleteOutfit = () => {
  //   const temp = userOutfits.filter((outfit) => outfit.id )


  //   setUserOutfits()
  // }



  return (
    <div className='outfit-overview'>
      <h3>YOUR OUTFIT</h3>
      <div className='outfit-carousel-wrapper'>
        <RiArrowLeftSLine className='left-arrow' />
        <div className='outfit-container'>
          <div className='outfit-list'>
            <div className='outfit-content'>
              <AddCard addOutfit={addOutfit} />
              {
                userOutfits.map((outfit) => <OutfitCard key={outfit.id} outfit={outfit}/>)
              }
              <RiArrowRightSLine className='right-arrow' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
