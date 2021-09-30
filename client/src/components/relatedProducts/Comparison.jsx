/* eslint-disable */
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
// import { GiCheckMark } from 'react-icons/gi'
import { RiStarSmileFill } from 'react-icons/Ri'
import { createPortal } from 'react-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Comparison = (props) => {
  const [isOpen, setOpen] = useState(false)
  const [currentCharacteristics, setCurrentCharacteristics] = useState([])
  const [allCharacteristics, setAllCharacteristics] = useState([])
  const { productId } = useParams()

  const toggleModal = () => {
    if (!isOpen) {
      getCharacteristics()
    }
    setOpen(!isOpen)
  }

  const getCharacteristics = async () => {
    try {
      const { data } = await axios.get(`/reviews/meta?product_id=${productId}`)
      setCurrentCharacteristics(data.characteristics)

      let currentChar = data.characteristics;
      let relatedChar = props.relatedProduct.characteristics;
      let allCharWithDupe = [...Object.keys(currentChar), ...Object.keys(relatedChar)]

      setAllCharacteristics(Array.from(new Set(allCharWithDupe)))
    } catch (error) {
      console.log(error.message)
    }
  }




  return (
    <React.Fragment>
      <div className="favorite-btn" onClick={toggleModal}>
        <RiStarSmileFill />
      </div>

      {
        isOpen
          ? createPortal(
            <React.Fragment>
              <div className="modal">
                <div className="modal-body">
                  <h1>Comparing</h1>
                  <table>
                    <thead>
                      <tr>
                        <th>{props.currentProduct.name}</th>
                        <th>Characteristic</th>
                        <th>{props.relatedProduct.name}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        allCharacteristics.map((char, i) => {
                          return (
                            <tr key={i}>
                              <td>{currentCharacteristics[char]?.value}</td>
                              <td>{char}</td>
                              <td>{props.relatedProduct.characteristics[char]?.value}</td>
                            </tr>
                          )
                        })
                      }
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
          null
      }
    </React.Fragment >
  );
};

export default Comparison;
