/**
 * @jest-environment jsdom
 */

import React from 'react';
import 'regenerator-runtime/runtime';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {rest} from 'msw';
import {setupServer} from 'msw/node'

// components
import App from '../../client/src/index.jsx';

// setup test data
let testResponse = {
  "id": 47421,
  "campus": "hr-rpp",
  "name": "Camo Onesie",
  "slogan": "Blend in to your crowd",
  "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
  "category": "Jackets",
  "default_price": "140.00",
  "created_at": "2021-08-26T20:30:48.129Z",
  "updated_at": "2021-08-26T20:30:48.129Z",
  "features": "[{…}, {…}]"
}

//setup worker
const server = setupServer(
  rest.get('/productDetail*', (req, res, ctx) => {
    return res(ctx.json(testResponse))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Index App', () => {
  test('Should render the app title', async function() {
    const app = render(<App/>);
    expect(screen.getByText('PROJECT ATLIER')).toBeInTheDocument();
    expect(await app.findByText(testResponse.name)).toBeInTheDocument();
    expect(await app.findByText(testResponse.description)).toBeInTheDocument();
  });
});