/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactDOM from 'react-dom'
import axios from 'axios'

const NewAnswer = (props) => {
  const [answers, setAnswers] = useState([])
  const [moreAnswers, setMoreAnswers] = useState([])
  const [helpfulness, setHelpfulness] = useState(props.helpfulness)
  const [helpful, setHelpful] = useState(false)
  const [report, setReport] = useState('Report')

  const tableStyle = {
    tableLayout: 'fixed',
    width: '100%',
  }
  const imgStyle = {
    align: 'left',
    margin: '1%',
    height: '20%',
    width: '20%',
  }
  const answerBorderStyle = {
    width: '90%',
    margin: '5%',
  }
  const answerStyle = {
    width: '95%',
    margin: '5%',
    borderBottom: '1px solid black',
    maxHeight: '100%',
  }
  const answerInfoStyle = {
    color: 'grey',
    textAlign: 'left',
    margin: '2%',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '80%',
  }
  const answerHelpfulStyle = {
    textAlign: 'left',
    margin: '2%',
    fontSize: '80%',
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: 'grey',
  }

  const helpfulButtonStyle = {
    color: 'limeGreen',
    textDecoration: 'underline',
  }

  const answerReportStyle = {
    color: 'red',
    textAlign: 'left',
    margin: '2%',
    fontSize: '80%',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontWeight: 'bold',
  }
  const sellerStyle = {
    color: 'grey',
    textAlign: 'left',
    margin: '2%',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '100%',
  }

  const reportAnswer = (e) => {
    const answerId = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id
    e.preventDefault()
    axios.put('/qa/answers/report/?answer_id=' + answerId)
      .then(data => {
        return setReport(data.data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  const helpfulAnswer = (e) => {
    const answerId = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id
    e.preventDefault()
    if (!helpful) {
      setHelpful(true)
      axios.put('/qa/answers/helpful/?answer_id=' + answerId)
        .then(data => {
          return setHelpfulness(helpfulness + 1)
        })
        .catch(err => {
          console.error(err)
        })
    } else {
      return
    }
  }

  return (
    <div style={answerStyle}>
      <div className='answer-body' id={props.id} key={props.id + 'b'}>
            <div>A: {props.body}</div>
            <div>{props.photos && Array.isArray(props.photos) ? props.photos.map((image, i) => (
              <img style={imgStyle} className="rendered-answer-img" src={image.url} key={props.id+'a' + i}/>
            )) : null}</div>
            <table style={tableStyle}>
              <tbody>
                <tr>
                  <td style={answerInfoStyle} className='answer-panel'> by {props.name && props.name.toLowerCase() === 'seller' ? <b style={sellerStyle}>Seller,</b> : props.name + ','} {props.month} {props.day}, {props.year}
                  </td>
                  <td style={answerHelpfulStyle}>
                    Helpful?
                    {!helpful ? <b href="" className='helpful-answer' onClick={helpfulAnswer} style={helpfulButtonStyle} >Yes</b> : 'Yes'}
                    (<span id="answer-helpfulness">{helpfulness ? helpfulness : 0}</span>)
                  </td>
                  {report === 'Report' ? <td style={answerReportStyle} className='report-answer'>
                    <span href='' id="report-answer-link" onClick={reportAnswer}>{report}</span>
                  </td> : <td style={answerReportStyle} className='report-answer'>
                    {report}
                  </td>}
                </tr>
              </tbody>
            </table>
          </div>
    </div>
  )
}

export default NewAnswer
