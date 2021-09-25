import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactDOM from 'react-dom'
import axios from 'axios'

const NewAnswer = (props) => {
  const [answers, setAnswers] = useState(['test1, test2'])
  const [moreAnswers, setMoreAnswers] = useState(['dummy', 'data'])
  const [helpfulness, setHelpfulness] = useState(props.helpfulness)
  let renderMoreAnswers = <div />

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
    const answerId = e.target.parentNode.parentNode.parentNode.id
    e.preventDefault()
    axios.put('/qa/answers/report/?answer_id=' + answerId)
      .then(data => {
        return alert('This Answer has been reported')
      })
      .catch(err => {
        console.error(err)
      })
  }

  const helpfulAnswer = (e) => {
    const answerId = e.target.parentNode.parentNode.parentNode.id
    e.preventDefault()
    axios.put('/qa/answers/helpful/?answer_id=' + answerId)
      .then(data => {
        // console.log(helpfulAns)
        return setHelpfulness(helpfulness + 1)
      })
      .catch(err => {
        console.error(err)
      })
  }

  // // INITIAL RENDER
  // const initialize = (questionId, callback) => {
  //   getAllAnswers(props.question_id, (err, data) => {
  //     if (err) {
  //       console.error(err)
  //     } else {
  //       callback(null, data.data)
  //     }
  //   })
  // }

  // // INITIAL RENDER INVOCATION
  // useEffect(() => {
  //   initialize(props.question_id, (err, data) => {
  //     if (err) {
  //       console.error(err)
  //     } else {
  //       setAnswers(data.slice(0, 2))
  //       setMoreAnswers(data)
  //     }
  //   })
  // }, [props.question_id])

  return (
    <>
      <div className='answer-body' id={props.id} key={props.id + 1}>
            <div>A: {props.body}</div>
            <div>{props.photos && Array.isArray(props.photos) ? props.photos.map(image => (
              <img className="rendered-answer-img" src={image.url} key={image.url}/>
            )) : null}</div>
            <table>
              <tbody>
                <tr>
                  <td className='answer-panel'> by {props.name}, {props.month} {props.day}, {props.year} |
                    {/* <div className='answer-panel'><div>by {props.name}, {props.month} {props.day}, {props.year} | <div>Helpful?</div><a href="" className='helpful-answer' onClick={helpfulAnswer}>Yes</a><div>({helpfulness ? helpfulness : 0})</div> | <div className='report-answer' onClick={reportAnswer}>Report</div></div></div> */}
                  </td>
                  <td>
                    Helpful?
                  </td>
                  <td>
                    <a href="" className='helpful-answer' onClick={helpfulAnswer}>Yes</a>
                  </td>
                  <td>
                    ({helpfulness ? helpfulness : 0}) |
                  </td>
                  <td className='report-answer' onClick={reportAnswer}>
                    Report
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      <div>{renderMoreAnswers}</div>
    </>
  )
}

export default NewAnswer
