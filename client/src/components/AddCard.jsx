import React from 'react';
import { AiOutlineCloseCircle, AiOutlinePlus } from 'react-icons/ai';


export default function AddCard(props) {
  return (
    <div className="add-card">
      <div className="add-text">
        Add to Outfit
      </div>
      <div className="add-card-container">
        <div className="add-btn"><AiOutlinePlus /></div>
        <div className="add-image"></div>
      </div>
    </div>

  )

}