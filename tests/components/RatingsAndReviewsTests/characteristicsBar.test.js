/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CharacteristicsBar from '../../../client/src/components/Review Widget/AddReview/CharacteristicsBar.jsx'

const key = 'Size';
const handleCharacteristicChange = () => {
  console.log('dummy function')
}
const id = 128;

describe('Characteristics Bar in Add Review Component', () => {
  test('Should exist on the dom', function () {
    render(<CharacteristicsBar key={key} handleCharacteristicChange={handleCharacteristicChange} characteristic={key} characteristic_id={id} />)

    const characteristicBar = screen.getByTestId('testCharacteristcBar')
    expect(characteristicBar).toHaveClass('characteristicBar');
  })

  test('Should render a rating description corresponding to the given characteristic', function () {
    render(<CharacteristicsBar key={key} handleCharacteristicChange={handleCharacteristicChange} characteristic={key} characteristic_id={id} />)

    const characteristicBar = screen.getByTestId('testCharacteristcBar')
    const tooSmallRadio = screen.getByText('A size too small')
    expect(tooSmallRadio).toBeInTheDocument();
  })

})