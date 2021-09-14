const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const APIurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/';
const token = require('./config.js');

app.use(express.static('client/dist'));
app.use('/product/:id', express.static('client/dist'));
app.use('/product/:id/carousel', express.static('client/dist'));

app.get('/productDetail*', (req, res) => {
  // console.log('product details request received', req.url);
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


/////RELATED PRODUCTS////
app.get('/product/:id/related', async (req, res) => {
  let options = {
    headers: {
      'Authorization': token.API_KEY
    }
  }
  let productId = req.params.id
  try {
    let response = await axios.get(`${APIurl}products/${productId}/related`, options)
    const relatedIds = response.data;

    let relatedProducts = [];

    for (let i = 0; i < relatedIds.length; i++) {
      const relatedId = relatedIds[i];

      response = await axios.get(`${APIurl}products/${relatedId}`, options)
      const product = response.data;




      response = await axios.get(`${APIurl}products/${relatedId}/styles`, options)
      const defaultStyle = response.data.results.find(style => style['default?']) || {};
      const productStyle = response.data.results.map(item => item.photos[0].url);


      response = await axios.get(`${APIurl}reviews/meta?product_id=${relatedId}`, options)
      console.log('reviews', response.data)

      relatedProducts.push({
        photo: productStyle[0],
        category: product.category,
        name: product.name,
        price: defaultStyle.sale_price ? defaultStyle.sale_price : product.default_price

      })
    }
    res.status(200).send(relatedProducts)
  } catch(err) {
    res.status(500).send(err);
  }
});





app.listen(port, () => {
  console.log(`Server listening http://localhost:${port}`);
})

