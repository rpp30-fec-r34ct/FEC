
/* eslint-disable */
/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'
import 'regenerator-runtime/runtime'
import '@testing-library/jest-dom'
import { createMemoryHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
import testProduct from '../../../testData/testProduct'
import OutfitList from '../../../client/src/components/relatedProducts/OutfitList.jsx'

let app


let windowSpy;

// beforeEach(() => {
//   windowSpy = jest.spyOn(window, "window", "get");
// });

// afterEach(() => {
//   windowSpy.mockRestore();
// });

// it('should return https://example.com', () => {
  // windowSpy.mockImplementation(() => ({
  //   location: {
  //     origin: "https://example.com"
  //   }
  // }));

//   expect(window.location.origin).toEqual("https://example.com");
// });

// it('should be undefined.', () => {
//   windowSpy.mockImplementation(() => undefined);

//   expect(window).toBeUndefined();
// });

var localStorageMock = (function() {
    var store = {};

    return {
        getItem: function(key) {
            return store[key] || null;
        },
        setItem: function(key, value) {
            store[key] = value.toString()
        },
        clear: function() {
            store = {};
        }
    };
})();

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock
})


describe('Outfit List Component', function () {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      // value: localStorageMock,
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null)
      },
      writable: true
    });

    const history = createMemoryHistory()
    const route = '/product/47421/carousel'
    history.push(route)
    app = render(
      <Router history={history}>
        <Switch>
          <Route path='/product/:productId/carousel/'>
            <OutfitList currentOverview={testProduct} />
          </Route>
        </Switch>
      </Router>
    )

  })
  test('Outfit List should render', () => {
    expect(app).toMatchSnapshot()
  })
  test('Outfit List should initially have no items', () => {
    expect(app.container.querySelector('.carousel-content').children.length).toEqual(0)
  })
  test('Outfit List should have a header', () => {
    expect(app.container.querySelector('.outfit-list-header-1').innerHTML).toBe('YOUR OUTFIT')
  })

  test('Outfit List should get item from local storage', () => {
      expect(window.localStorage.getItem).toHaveBeenCalledTimes(1)
  })
})
