import React from 'react';
import AddCard from './AddCard.jsx';
import OutfitCard from './OutfitCard.jsx';


export default function OutfitList(props) {
  return (
    <div className="outfit-list">
      <AddCard />
      {/* <OutfitCard /> */}
    </div>
  )
}