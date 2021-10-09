/**
 * @jest-environment jsdom
 */

import React from 'react'
import ReactDOM from 'react-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import 'regenerator-runtime/runtime'
import mockAxios from 'axios'
import { setupServer } from 'msw/node'
import AddReviewModal from '../../../client/src/components/Review Widget/AddReview/AddReviewModal.jsx'
import { act } from 'react-dom/test-utils';
import userEvent from "@testing-library/user-event"


jest.mock('axios');

const productId = 47424;
const isAddReview = 1;
const onAddReviewClick = () => {
  console.log('dummy function')
}
const testName = 'Slacker\s Slacks'

const reviewsMeta = {
  "product_id": "47424",
  "ratings": {
      "2": "2",
      "3": "6",
      "4": "8",
      "5": "3"
  },
  "recommended": {
      "false": "3",
      "true": "16"
  },
  "characteristics": {
      "Fit": {
          "id": 159168,
          "value": "2.5625000000000000"
      }
  }
}

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});




describe('Modal Component Smoke Test', () => {
  test('renders a modal with the right product name', async () => {

    await act(async () => {
      render(<AddReviewModal testName={testName} productId={productId} isAddReview={isAddReview} onAddReviewClick={onAddReviewClick} reviewsMeta={reviewsMeta} />, container);
    });

    expect(await screen.getByTestId('testModalContainer') ).toBeInTheDocument()
  })

  test('should update the characterisitcs state when a new radio button is clicked', async () => {
   // const result = render(<AddReviewModal testName={testName} productId={productId} isAddReview={isAddReview} onAddReviewClick={onAddReviewClick} reviewsMeta={reviewsMeta} />, container)

    await act(async () => {
      const result = render(<AddReviewModal testName={testName} productId={productId} isAddReview={isAddReview} onAddReviewClick={onAddReviewClick} reviewsMeta={reviewsMeta} />, container);
    });

    const elementToClick = screen.getByTestId('testRadioBar');
    userEvent.click(elementToClick);
    const clickedElement = screen.getByTestId('testRadioBar');
    expect(await clickedElement.checked).toBe(true)

  })

  test('should allow for the no recommend radio button to be clicked by itself', async () => {
    // const result = render(<AddReviewModal testName={testName} productId={productId} isAddReview={isAddReview} onAddReviewClick={onAddReviewClick} reviewsMeta={reviewsMeta} />, container)

     await act(async () => {
       const result = render(<AddReviewModal testName={testName} productId={productId} isAddReview={isAddReview} onAddReviewClick={onAddReviewClick} reviewsMeta={reviewsMeta} />, container);
     });

     const elementToClick = screen.getByTestId('testnoRecommend');
     userEvent.click(elementToClick);
     const clickedElement = screen.getByTestId('testnoRecommend');
     expect(await clickedElement.checked).toBe(true)

   })

   test('should allow for the no recommend radio button to be clicked by itself', async () => {
     await act(async () => {
       const result = render(<AddReviewModal testName={testName} productId={productId} isAddReview={isAddReview} onAddReviewClick={onAddReviewClick} reviewsMeta={reviewsMeta} />, container);
     });

     const elementToClick = screen.getByTestId('testnoRecommend');
     userEvent.click(elementToClick);
     const clickedElement = screen.getByTestId('testnoRecommend');
     expect(await clickedElement.checked).toBe(true)

   })

   test('should allow for users to type in the summary field ', async () => {
     await act(async () => {
       const result = render(<AddReviewModal testName={testName} productId={productId} isAddReview={isAddReview} onAddReviewClick={onAddReviewClick} reviewsMeta={reviewsMeta} />, container);
     });

     const elementToTypeIn = screen.getByTestId('testReviewSummary');
     userEvent.type(elementToTypeIn, 'Hello, World!');
     expect(await screen.getByTestId('testReviewSummary')).toHaveValue('Hello, World!')
   })

   test('should allow for users to type in the body field ', async () => {
    await act(async () => {
      const result = render(<AddReviewModal testName={testName} productId={productId} isAddReview={isAddReview} onAddReviewClick={onAddReviewClick} reviewsMeta={reviewsMeta} />, container);
    });

    const elementToTypeIn = screen.getByTestId('testReviewBody');
    userEvent.type(elementToTypeIn, 'Hello, World!');
    expect(await screen.getByTestId('testReviewBody')).toHaveValue('Hello, World!')
  })

  test('should allow for users to type in the nickname field ', async () => {
    await act(async () => {
      const result = render(<AddReviewModal testName={testName} productId={productId} isAddReview={isAddReview} onAddReviewClick={onAddReviewClick} reviewsMeta={reviewsMeta} />, container);
    });

    const elementToTypeIn = screen.getByTestId('testReviewNickName');
    userEvent.type(elementToTypeIn, 'Hello, World!');
    expect(await screen.getByTestId('testReviewNickName')).toHaveValue('Hello, World!')
  })

  test('should allow for users to type in the email field ', async () => {
    await act(async () => {
      const result = render(<AddReviewModal testName={testName} productId={productId} isAddReview={isAddReview} onAddReviewClick={onAddReviewClick} reviewsMeta={reviewsMeta} />, container);
    });

    const elementToTypeIn = screen.getByTestId('testReviewEmail');
    userEvent.type(elementToTypeIn, 'Hello, World!');
    expect(await screen.getByTestId('testReviewEmail')).toHaveValue('Hello, World!')
  })

  test('should reject a submission if an email does not contain an @ sign', async () => {
    window.alert = () => {};
    await act(async () => {
      const result = render(<AddReviewModal testName={testName} productId={productId} isAddReview={isAddReview} onAddReviewClick={onAddReviewClick} reviewsMeta={reviewsMeta} />, container);
    });
    const elementToTypeIn = screen.getByTestId('testReviewEmail');
    await userEvent.type(elementToTypeIn, 'Hello, World!');
    const elementToClick = screen.getByTestId('testAddReviewSubmit');
    userEvent.click(elementToClick)
    //i'm expecting for the email text to still be in teh document as the submission failed.
    //i can't test for the alert specifically because jsdom doesn't include window.alert.
    //if the submission were to succeed, then the email element would no longer be on the screen
    expect(await screen.getByTestId('testReviewEmail')).toHaveValue('Hello, World!')

  })

})



