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
    if (e.target.id === 'answer-modal' || e.target.id === 'submit-answer') {
      return setShowModal(false)
    }
  }

  const uploadImg = (e) => {
    var base64Data;
    if (e.target.files[0]) {
      var formData = new FormData()
      formData.append(
        'file',
        e.target.files[0]
      )
      console.log('this is the form data', formData)
      var reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onloadend = () => { base64Data = reader.result}
    }
    console.log('test1', reader, reader.result)
    setTimeout( ()=>{
      console.log('test2', reader, reader.result)
      setImages(prev => {
        return [...prev, base64Data]
      })
    }, 1000

    )
  }

  const submitNewAnswer = (e) => {
    e.preventDefault()
    // return console.log('images: ', images)
    if (!e.target[0].value || !e.target[1].value || !e.target[2].value) {
      return alert('Your answer could not be processed. You must enter ALL of the following: \n Your Answer, \n Your Nickname, and \n Your Email Address')
    }
    setShowModal(false)
    const answer = e.target[0].value
    const nickname = e.target[1].value
    const email = e.target[2].value
    const id = e.target.parentNode.id
    const photos = images
    axios({
      method: 'post',
      url: '/qa/answer',
      data: {
        answer: answer,
        nickname: nickname,
        email: email,
        id: id,
        photos: photos
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
              <input name='nickname' type='text' size="30" placeholder='Your Nickname' />
              <input name='email' type='text' size="30" placeholder='Example: jack@email.com' />
              {images.length < 5 ? (
                <input type="file" className="file" accept="image/*" id="files" onChange={uploadImg}/>
              ) : null}
              <button type='submit' id='submit-answer'>Submit</button>
            </form>
            {images ? (
              images.map(image => (
                <img src={image} className="answer-image" key={image}/>
              ))
            ) : null}
            <img src={src} alt={alt} />
          </div>
        </div>
    </>
  )
}

export default AnswerModal
