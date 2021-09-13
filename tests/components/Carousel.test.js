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
import Carousel from '../../client/src/components/Carousel.jsx';