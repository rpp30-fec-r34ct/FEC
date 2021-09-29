/* eslint-disable */
import React, { useState } from 'react'
import ReactDOM from 'react-dom';
// import { GiCheckMark } from 'react-icons/gi'
import { RiStarSmileFill } from 'react-icons/Ri'
import { createPortal } from 'react-dom'

const Comparison = (props) => {
  const [isOpen, setOpen] = useState(false);
  const toggleModal = () => setOpen(!isOpen);

  console.log('product', props.currentProduct)

  return (
    <React.Fragment>
      <div className="favorite-btn" onClick={() => toggleModal()}>
        <RiStarSmileFill />
      </div>

      {isOpen
        ? createPortal(
          <React.Fragment>
            <div className="modal">
              <div className="modal-body">
                <h1>Comparing</h1>
                <table>
                  <thead>
                    <tr>
                      <th>Current Product Name</th>
                      <th>Characteristic</th>
                      <th>Compared Product Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>{
                      props.currentProduct && props.currentProduct.characteristics && Object.keys(props.currentProduct?.characteristics).map((name, i) => {
                        return (
                          <td>{name}</td>
                        )
                      })
                    }
                    </tr>
                  </tbody>
                </table>
                <button className="close" onClick={toggleModal}>
                  Close
                </button>
              </div>
            </div>
          </React.Fragment >,
          document.getElementById('modal')
        ) :
        null}
    </React.Fragment>
  );
};

export default Comparison;
