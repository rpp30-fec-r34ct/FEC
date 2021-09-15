/**
 * @jest-environment jsdom
 */

 import React from 'react'
 import { render } from '@testing-library/react'
 import '@testing-library/jest-dom'

 // components
 import QAList from '../../client/src/QAComponents/QAList.jsx'

 describe('QA List', () => {
   test('Should render the App title', function () {
     const qalist = render(<QAList />)
     expect(qalist.getByText('PROJECT ATLIER')).toBeInTheDocument()
   })
 })
