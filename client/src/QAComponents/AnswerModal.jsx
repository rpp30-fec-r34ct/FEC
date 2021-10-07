/* eslint-disable */
import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import ReactDOM from 'react-dom'
import axios from 'axios'

const AnswerModal = (props) => {
  const modalRef = useRef()
  const [showModal, setShowModal] = useState(true)
  const [{alt, src}, setImg] = useState([{
    alt,
    src
  }])
  const [images, setImages] = useState([])

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape') {
        setShowModal(false)
      }
    },
    [setShowModal, showModal]
  )

  const handleClickOutside = (e) => {
    // e.preventDefault()
    if (e.target.id === 'answer-modal') {
      return setShowModal(false)
    }
  }

  const uploadImg = (e) => {
    if (e.target.files[0]) {
      setImages(prev => {
        return [...prev, {
        alt: e.target.files[0].name,
        src: URL.createObjectURL(e.target.files[0])
      }]
      })
    }
  }

  const submitNewAnswer = (e) => {
    e.preventDefault()
    if (!e.target[0].value || !e.target[1].value || !e.target[2].value) {
      return alert('Your answer could not be processed. You must enter ALL of the following: \n Your Answer, \n Your Nickname, and \n Your Email Address')
    }
    const answer = e.target[0].value
    const nickname = e.target[1].value
    const email = e.target[2].value
    const id = e.target.parentNode.id
    const photos = images
    axios.post('/qa/answer?answer=' + answer + '&nickname=' + nickname + '&email=' + email + '&id=' + id, {
      answer: answer,
      nickname: nickname,
      email: email,
      id: id,
      photos: photos
    })
      .then(data => {
        setShowModal(false)
        return setImages([])
      })
      .catch(err => console.error(err))
  }

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress)
      return () => document.removeEventListener('keydown', keyPress)
    },
    []
  )

  return (
    <>
        <div id="answer-modal" onClick={handleClickOutside}>
          <div className='add-answer-form' id={props.question_id}>
          <button className="close-button" onClick={() => { return setShowModal(false)}}>X</button>
            <h1 id="answerModal-product">{document.getElementsByClassName('card-name')[0] ? document.getElementsByClassName('card-name')[0].innerHTML : 'Product'}: {props.body}</h1>
            <form onSubmit={submitNewAnswer}>
              <input name='answer' type='text' placeholder='Your Answer' maxLength="1000" size="100" className="modal-textbox"/>
              <input name='nickname' type='text' placeholder='Your Nickname' />
              <input name='email' type='text' placeholder='Your Email' />
              {images.length < 5 ? (
                <input type="file" className="file" accept="image/*" id="files" onChange={uploadImg}/>
              ) : null}
              <button type='submit'>Submit</button>
            </form>
            {images ? (
              images.map(image => (
                <img src={image.src} alt={image.alt} className="answer-image" key={image.src}/>
              ))
            ) : null}
            <img src={src} alt={alt} />
          </div>
        </div>
    </>
  )
}

export default AnswerModal
