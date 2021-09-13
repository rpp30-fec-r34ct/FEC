const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const APIurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/';
const token = require('./config.js');

app.use(express.static('client/dist'));
app.use('/product/:id', express.static('client/dist'));

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

      // console.log('product', product)


      response = await axios.get(`${APIurl}products/${relatedId}/styles`, options)
      const defaultStyle = response.data.results.find(style => style['default?']) || {};
      // const photoStyle = response.data.results[0].photos[1].url;

      // console.log('photo', response.data.results.find(item => item.photos))

      // console.log('default', defaultStyle)

      // response = await axios.get(`${APIurl}products/reviews/meta/`, options)
      // const averageRating = response.data.ratings;

      // console.log('rating', averageRating)

      // const ratingStyle = (ratings) => {
      //   let result = 0;

      //   let values = Object.values(ratings);

      //   let sum = values.reduce((previous, current) => previous + current);

      //   for (let key in ratings) {
      //     result += ((key * ratings[key] / sum));
      //   }
      //   return result;
      //   console.log('result', result)
      // }


      relatedProducts.push({
        // photo: "",
        category: product.category,
        name: product.name,
        price: defaultStyle.sale_price ? defaultStyle.sale_price : defaultStyle.original_price
        // rating: ""
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

