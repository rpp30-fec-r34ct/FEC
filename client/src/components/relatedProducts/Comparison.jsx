/* eslint-disable */
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import { GiCheckMark } from 'react-icons/gi'
import { RiStarSmileFill } from 'react-icons/ri'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { createPortal } from 'react-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Comparison = (props) => {
  const [isOpen, setOpen] = useState(false)
  const [currentFeatures, setCurrentFeatures] = useState([])
  const [allFeatures, setAllFeatures] = useState([])
  const { productId } = useParams()

  const toggleModal = () => {
    if (!isOpen) {
      getFeatures()
    }
    setOpen(!isOpen)
  }

  const getFeatures = async () => {
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
                <div className="close-btn" onClick={toggleModal}>
                  <AiOutlineCloseCircle />
                </div>
                <div className="modal-body">
                  <h3>Comparing</h3>
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
                              <td>{currentCharacteristics[char]?.value === true && <GiCheckMark /> || Number(currentCharacteristics[char]?.value).toFixed(2)}</td>
                              <td>{char}</td>
                              <td>{props.relatedProduct.characteristics[char]?.value === true && <GiCheckMark /> || Number(props.relatedProduct.characteristics[char]?.value).toFixed(2)}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
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
