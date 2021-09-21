/**
 * @jest-environment jsdom
 */

 import React from 'react'
 import { render, screen } from '@testing-library/react'
 import '@testing-library/jest-dom'

 // component
 import productBreakDown from '../../../client/src/components/Review Widget/productBreakDown.jsx'
 const characteristicsData = {
  {Fit: 2.4 }
 }


 describe('Bar Line Component', () => {
   test('Should be on the DOM', function () {
     render(<productBreakDown numberOfReviews={data.numberOfReviews} star={data.star} />)

     const barLineElement = screen.getByTestId('testBarLine')
     expect(barLineElement).toHaveClass('BarLine');
   })
 })