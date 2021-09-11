const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const APIurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/';
const token = require('./config.js');

app.use(express.static('client/dist'));
app.use('/product/:id', express.static('client/dist'));

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

app.get('/qa/questions', (req, res) => {
  console.log('questions and answers...', req._parsedUrl);
  // let
  axios.get(APIurl + 'qa/questions/' + req._parsedUrl.query, {
    // let productId = req.url.slice(14,req.url.length);
    // axios.get(APIurl + `qa/questions/?${productId}`, {
    headers: {
      'Authorization': token.API_KEY
    }
  })
  .then(data => res.status(200).send(data))
  .catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

app.listen(port, () => {
  console.log(`Server listening http://localhost:${port}`);
})

