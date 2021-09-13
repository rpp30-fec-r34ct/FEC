const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const APIurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/';
const token = require('./config.js');

// app.use('/product/:id', express.static('client/dist'));
app.use(express.static('client/dist'));

app.get('/productDetail*', (req, res) => {
  console.log('product details request received', req.url);
  let productId = req.url.slice(14,req.url.length);
  axios.get(APIurl + `products/${productId}`, {
    headers: {
      'Authorization': token.API_KEY
    }
  })
  .then((data) => {
    console.log('[GET][PRODUCT DETAILS] data successfully retrieved from API, sending back to client');
    res.status(200).send(data.data);
  })
  .catch ((err) => {
    console.error(err);
    res.sendStatus(500);
  })
});

app.get('/reviews', (req, res) => {
  console.log('got reviews request');
  axios.get(APIurl + 'reviews', {
    headers: {
      'Authorization': token.API_KEY
    },
    params: {
      sort: req.query.sort,
      product_id: req.query.product_id
    }
  }).then ((data) => {
    res.status(200).send(data.data);
  })
  .catch ((err) => {
    console.error(err);
    res.sendStatus(500);
  })
});

app.listen(port, () => {
  console.log(`Server listening http://localhost:${port}`);
});

