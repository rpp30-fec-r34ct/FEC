/**
 * @jest-environment jsdom
 */

 import React from 'react'
 import { render, screen } from '@testing-library/react'
 import '@testing-library/jest-dom'

 // component
 import BarLine from '../../../client/src/components/ReviewWidget/BarLine.jsx'
 const data = {
   star: 4,
   numberOfReviews: 6
 }


 describe('Bar Line Component', () => {
   test('Should be on the DOM', function () {
     render(<BarLine numberOfReviews={data.numberOfReviews} star={data.star} />)

     const barLineElement = screen.getByTestId('testBarLine')
     expect(barLineElement).toHaveClass('BarLine');
   })
 })