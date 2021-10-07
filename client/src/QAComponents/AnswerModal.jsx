import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import ReactDOM from 'react-dom'
import axios from 'axios'

const AnswerModal = (props) => {
  // console.log('handlemodalchange', props.handleModalChange)
  const modalRef = useRef()
  const [{alt, src}, setImg] = useState([{
    alt,
    src
  }])
  const [images, setImages] = useState([])
  const [uploads, setUploads] = useState([])
  const imgStyle = {
    height: '25%',
    width: '25%',
  }

  const imgModalStyle = {
    height: '200px',
    weight: '200px',
  }
  const modalStyle = {
    display: 'grid',
    justifyContent: 'center',
    gridTemplateColumns: 'auto auto auto auto auto',
    gridTemplateRows: 'auto auto auto auto auto',
    position: 'fixed',
    zIndex: '999999999999',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgb(0,0,0)',
    backgroundColor: 'rgba(0,0,0,0.4)',
  }
  const formStyle = {
    gridColumn: '1 / span 4',
    gridRow: '1',
    position: 'fixed',
    margin: '15% auto',
    padding: '20px',
    backgroundColor: 'whitesmoke',
    border: '3px solid grey',
    width: '80%',
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
    if (!e.target[0].value || !e.target[1].value || !e.target[2].value) {
      return alert('Your answer could not be processed. You must enter ALL of the following: \n Your Answer, \n Your Nickname, and \n Your Email Address')
    }
    if (!e.target[2].value.includes('@')) {
      return alert('Please enter a valid email address')
    }
    const data = new FormData()
    data.append('answer', e.target[0].value)
    data.append('nickname', e.target[1].value)
    data.append('email', e.target[2].value)
    data.append('id', e.target.parentNode.id)
    if (images.length > 0) {images.map(image => data.append(image.name, image))} else {data.append('photos', [])}
    axios.post('/qa/answer', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(data => {
        setImages([])
        // return props.handleModalChange(e)
      })
      .catch(err => console.error(err))
  }

  return (
    <>
        <div style = {modalStyle} id="answer-modal">
          <div style={formStyle} className='add-answer-form' id={props.question_id}>
          <button className="close-button">X</button>
            <h1 id="answerModal-product">{document.getElementsByClassName('card-name')[0] ? document.getElementsByClassName('card-name')[0].innerHTML : 'Product'}: {props.body}</h1>
            <form action="/test" method="post" encType="multipart/form-data" onSubmit={submitNewAnswer}>
              <input name='answer' type='text' placeholder='Your Answer' maxLength="1000" size="100" className="modal-textbox" style={{gridRow: '4/4'}}/>
              <input name='nickname' type='text' size="30" placeholder='Your Nickname' style={{gridRow: '4/4'}}/>
              <input name='email' type='text' size="30" placeholder='Example: jack@email.com' style={{gridRow: '4/4'}}/>
              {images.length < 5 ? (
                <input type="file" className="file" accept="image/*" id="files" name="myFile" onChange={uploadImg} style={{gridRow: '4/4'}}/>
              ) : null}
              <button type='submit' id='submit-answer' style={{gridRow: '4/4'}}>Submit</button>
            </form>
            {images ? (
              images.map(image => (
                console.log(images),
                <img style={imgModalStyle} src={URL.createObjectURL(image)} alt={image.alt} className="answer-image" key={image.src + 1}/>
              ))
            ) : null}
            <img src={src} alt={alt} />
          </div>
        </div>
    </>
  )
}

export default AnswerModal
