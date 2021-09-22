/* eslint-disable */
import React from 'react'
import ReactDOM from 'react-dom';
import { GiCheckMark } from 'react-icons/gi'

const Comparison = ({ message, onShow, onClose, children }) => showModal ? ReactDOM.createPortal(
  < React.Fragment >
    <div className="modal-overview">
      <div className="modal-wrapper">
        <div className="modal">
          <div className="modal-header">
            <button onClick={onClose} className="modal-close">
              Close
            </button>
          </div>
          <p>{message}</p>
        </div>
      </div>
    </div>
  </React.Fragment >, document.body
) : null;

export default Comparison;
