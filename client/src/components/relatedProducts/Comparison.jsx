import React from 'react'

export default function Comparison (props) {
  return (
    <div className='modal-overview'>
      <div className='modal-header'>
        <table>
          <tbody>
            <tr>
              <th className='modal-col-1'>Current Item</th>
              <th className='modal-col-2'>COMPARING</th>
              <th className='modal-col-3'>Related Item</th>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='modal-body'>
        <table>
          <tbody>
            <tr>
              <td className='modal-col-1'>Current Item Feature</td>
              <td className='modal-col-2'>Feature</td>
              <td className='modal-col-3'>Related Item Feature</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
