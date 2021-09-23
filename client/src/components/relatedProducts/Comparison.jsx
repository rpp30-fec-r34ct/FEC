/* eslint-disable */
import React from 'react'
import ReactDOM from 'react-dom';
// import { GiCheckMark } from 'react-icons/gi'
import { createPortal } from 'react-dom'

const Comparison = ({ isOpen, onClose }) => isOpen ? ReactDOM.createPortal(
  < React.Fragment >
    <div className="modal">
      <h4>Test</h4>
      <button className="close" onClick={onClose}>
        Close
      </button>
    </div>
  </React.Fragment >, document.getElementById('modal')
) : null;

export default Comparison;
