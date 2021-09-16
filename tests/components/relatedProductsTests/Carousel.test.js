/**
 * @jest-environment jsdom
 */

import React from 'react'
import 'regenerator-runtime/runtime'
import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { createMemoryHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import Carousel from '../../../client/src/components/Carousel.jsx'

const data =
[
  {
    photo: null,
    category: 'Accessories',
    name: 'Bright Future Sunglasses',
    sale: null,
    price: '69.00',
    rating: {
      2: '1', 3: '1', 4: '2', 5: '1'
    },
    characteristic: {
      Quality: {
        id: 159163, value: '4.2000000000000000'
      }
    }
  },
  {
    photo: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
    category: 'Pants',
    name: 'Morning Joggers',
    sale: null,
    price: '40.00',
    rating: {},
    characteristic: {
      Fit: {
        id: 159164, value: null
      },
      Length: {
        id: 159165, value: null
      },
      Comfort: {
        id: 159166, value: null
      },
      Quality: {
        id: 159167, value: null
      }
    }
  },
  {
    photo: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    category: 'Kicks',
    name: 'YEasy 350',
    sale: null,
    price: '450.00',
    rating: {
      1: '1', 3: '1', 4: '1', 5: '2'
    },
    characteristic: {
      Size: {
        id: 159184, value: '3.4000000000000000'
      },
      Width: {
        id: 159185, value: '3.0000000000000000'
      },
      Comfort: {
        id: 159186, value: '3.4000000000000000'
      },
      Quality:
      { id: 159187, value: '4.6000000000000000' }
    }
  },
  {
    photo: 'https://images.unsplash.com/photo-1561861422-a549073e547a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
    category: 'Dress Shoes',
    name: 'Blues Suede Shoes',
    price: '120.00',
    rating: {
      1: '1', 5: '1'
    },
    characteristic: {
      Size: {
        id: 159180, value: '2.5000000000000000'
      },
      Width: {
        id: 159181, value: '4.5000000000000000'
      },
      Comfort: {
        id: 159182, value: '5.0000000000000000'
      },
      Quality: {
        id: 159183, value: '3.5000000000000000'
      }
    }
  }
]

// setup worker
const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Carousel', () => {
  test('Should fetch related product items from get API', async function () {
    server.use(
      rest.get('/product/47421/related', (req, res, ctx) => {
        return res(ctx.json(data))
      })
    )
    const history = createMemoryHistory()
    const route = '/product/47421/related'
    history.push(route)
    render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:productId/carousel/'>
            <Carousel />
          </Route>
        </Switch>
      </Router>
    )

    expect.assertions(1)

    await waitFor(() => expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'YEasy 350',
          rating: {
            1: '1', 3: '1', 4: '1', 5: '2'
          },
          price: '450.00'
        })
      ])
    )
    )
  })
})
