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
  // let renderMoreAnswers = <div />

  const tableStyle = {
    tableLayout: 'fixed',
    width: '100%',
  }
  const imgStyle = {
    // display: 'block',
    align: 'left',
    margin: 'auto',
    height: '25%',
    width: '25%',
  }
  const answerBorderStyle = {
    width: '90%',
    margin: '5%',
    // borderBottom: '2px solid black',
  }
  const answerStyle = {
    width: '95%',
    border: '1px solid black',
    margin: '2%',
    // borderBottom: '3px solid black',
    maxHeight: '100%',
    // width: '500px',
    // margin: '2%',
  }
  const answerInfoStyle = {
    // border: '1px solid black',
    textAlign: 'left',
    margin: '2%',
  }
  const answerHelpfulStyle = {
    // border: '1px solid black',
    textAlign: 'left',
    margin: '2%',
  }
  const answerReportStyle = {
    // border: '1px solid black',
    textAlign: 'left',
    margin: '2%',
  }

  // SERVER REQUESTS
  const getAllAnswers = (question, callback) => {
    if (question === undefined) {
      return
    }
    axios.get('/qa/answers?question_id=' + question)
      .then(data => {
        callback(null, data)
      })
      .catch(err => console.log(err))
  }

  const reportAnswer = (e) => {
    const answerId = e.target.parentNode.parentNode.parentNode.parentNode.id
    e.preventDefault()
    axios.put('/qa/answers/report/?answer_id=' + answerId)
      .then(data => {
        console.log(data)
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
      console.log('This answer has already been marked as "helpful"')
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
                  <td style={answerInfoStyle} className='answer-panel'> by {props.name && props.name.toLowerCase() === 'seller' ? <b>Seller</b> : props.name}, {props.month} {props.day}, {props.year}
                    {/* <div className='answer-panel'><div>by {props.name}, {props.month} {props.day}, {props.year} | <div>Helpful?</div><a href="" className='helpful-answer' onClick={helpfulAnswer}>Yes</a><div>({helpfulness ? helpfulness : 0})</div> | <div className='report-answer' onClick={reportAnswer}>Report</div></div></div> */}
                  </td>
                  <td style={answerHelpfulStyle}>
                    Helpful?
                    <a href="" className='helpful-answer' onClick={helpfulAnswer}>Yes</a>
                    ({helpfulness ? helpfulness : 0})
                  </td>
                  {/* <td>
                  </td>
                  <td>
                  </td> */}
                  {report === 'Report' ? <td style={answerReportStyle} className='report-answer' onClick={reportAnswer}>
                    {report}
                  </td> : <td style={answerReportStyle} className='report-answer'>
                    {report}
                  </td>}
                </tr>
              </tbody>
            </table>
          </div>
      {/* <div>{renderMoreAnswers}</div> */}
    </div>
  )
}

export default NewAnswer
