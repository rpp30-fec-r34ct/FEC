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
  const [allFeatures, setAllFeatures] = useState({})
  const { productId } = useParams()

  const toggleModal = () => {
    if (!isOpen) {
      getComparedFeatures()
    }
    setOpen(!isOpen)
  }

  const getComparedFeatures = () => {
    let comparedFeatures = {}
    let currentProductFeatures = props.currentProduct.features
    let relatedFeatures = props.relatedProduct.features

    currentProductFeatures.forEach((item) => {
      comparedFeatures[item.feature] = {
        value1: item.value || <GiCheckMark />,
        value2: null
      }
    })

    relatedFeatures.forEach((item) => {
      comparedFeatures[item.feature] ? comparedFeatures[item.feature].value2 = item.value
        : comparedFeatures[item.feature] = {
          value1: null,
          value2: item.value || <GiCheckMark />
        }
      setAllFeatures(comparedFeatures)
    })
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
                        Object.keys(allFeatures).map((info, i) => {
                          return (
                            <tr key={i}>
                              <td>{allFeatures[info].value1}</td>
                              <td>{info}</td>
                              <td>{allFeatures[info].value2}</td>
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
