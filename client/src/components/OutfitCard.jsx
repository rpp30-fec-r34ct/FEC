import React from 'react';
import { AiOutlineCloseCircle, AiOutlinePlus } from 'react-icons/ai';


export default function OutfitCard(props) {
  return (
    <div className="user-outfit-card">
      <div className="user-outfit-card-container">
        <div className="delete-btn"><AiOutlineCloseCircle /></div>
      </div>
    </div>
  )
}