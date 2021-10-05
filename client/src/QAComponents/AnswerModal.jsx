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
  const [uploads, setUploads] = useState([])

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
    if (e.target.id === 'answer-modal' || e.target.id === 'submit-answer') {
      return setShowModal(false)
    }
  }

  const uploadImg = (e) => {
    if (e.target.files[0]) {
      let image = new FormData()
      image.append('file', e.target.files[0])
      setImages(prev => {
        return [...prev, e.target.files[0]]
      })



    }
  }

  const submitNewAnswer = (e) => {
    e.preventDefault()
    console.log('images: ', images)
    setShowModal(false)
    if (!e.target[0].value || !e.target[1].value || !e.target[2].value) {
      return alert('Your answer could not be processed. You must enter ALL of the following: \n Your Answer, \n Your Nickname, and \n Your Email Address')
    }
    const data = new FormData()
    data.append('answer', e.target[0].value)
    data.append('nickname', e.target[1].value)
    data.append('email', e.target[2].value)
    data.append('id', e.target.parentNode.id)
    images.map(image => data.append(image.name, image))

    console.log('', data)
    const answer = e.target[0].value
    const nickname = e.target[1].value
    const email = e.target[2].value
    const id = e.target.parentNode.id
    const photos = images
    axios.post('/qa/answer', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    // axios.post('/qa/answer?answer=' + answer + '&nickname=' + nickname + '&email=' + email + '&id=' + id + '&photos=' + photos, {
    //   answer: answer,
    //   nickname: nickname,
    //   email: email,
    //   id: id,
    //   photos: photos
    // })
      .then(data => {
        console.log('the object file: ', data)
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
            <form action="/test" method="post" enctype="multipart/form-data" onSubmit={submitNewAnswer}>
              <input name='answer' type='text' placeholder='Your Answer' maxLength="1000" size="100" className="modal-textbox"/>
              <input name='nickname' type='text' size="30" placeholder='Your Nickname' />
              <input name='email' type='text' size="30" placeholder='Example: jack@email.com' />
              {images.length < 5 ? (
                <input type="file" className="file" accept="image/*" id="files" name="myFile" onChange={uploadImg}/>
              ) : null}
              <button type='submit' id='submit-answer'>Submit</button>
            </form>
            {images ? (
              images.map(image => (
                <img src={URL.createObjectURL(image)} className="answer-image" key={image}/>
              ))
            ) : null}
            <img src={src} alt={alt} />
          </div>
        </div>
    </>
  )
}

export default AnswerModal
