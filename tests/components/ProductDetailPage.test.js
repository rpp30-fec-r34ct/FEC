/**
 * @jest-environment jsdom
 */

import React from 'react';
import 'regenerator-runtime/runtime';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node'


// components
import ProductDetailPage from '../../client/src/components/ProductDetailPage.jsx';

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

describe('Product Detail Page', () => {
  test('Should render product details from get request', async function() {
    const history = createMemoryHistory()
    const route = '/product/47421'
    history.push(route)
    const app = render(
      <Router history={history}>
        <Switch>
          <Route path="/product/:id" component={ProductDetailPage}/>
        </Switch>
      </Router>,
    )
    expect(await app.findByText(testResponse.name)).toBeInTheDocument();
    expect(await app.findByText(testResponse.description)).toBeInTheDocument();
  })
});
