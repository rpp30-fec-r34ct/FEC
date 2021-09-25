/* eslint-disable */
import React, { useState } from 'react'
import ReactDOM from 'react-dom';
// import { GiCheckMark } from 'react-icons/gi'
import { AiOutlineStar } from 'react-icons/ai'
import { createPortal } from 'react-dom'

const Comparison = (props) => {
  const [isOpen, setOpen] = useState(false);
  const toggleModal = () => setOpen(!isOpen);

  return (
    <React.Fragment>
      <div className="favorite-btn" onClick={() => toggleModal()}>
        <AiOutlineStar />
      </div>

      {isOpen
        ? createPortal(
          <React.Fragment>
            <div className="modal">
              <h4>TEST</h4>
              <button className="close" onClick={toggleModal}>
                Close
              </button>
            </div>
          </React.Fragment >,
          document.getElementById('modal')
        ) :
        null}
    </React.Fragment>
  );
};

export default Comparison;
