const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')
const APIurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/'
const token = require('./config.js')

app.use('/product/:id', express.static('client/dist'))
<<<<<<< HEAD
app.use('/reviewPage', express.static('client/dist'))
=======
app.use('/reviewPage/:id', express.static('client/dist'))
>>>>>>> c2acb89980fc6c368f0c31d888ee59a530880a86
app.use('/product/:id/carousel', express.static('client/dist'))

app.get('/productDetail*', (req, res) => {
  // console.log('product details request received', req.url);
  const productId = req.url.slice(14, req.url.length)
  axios.get(APIurl + `products/${productId}`, {
    headers: {
      Authorization: token.API_KEY
    }
  })
    .then((data) => {
      console.log('[GET][PRODUCT DETAILS] data successfully retrieved from API, sending back to client')
      res.status(200).send(data.data)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
})

app.get('/reviews', (req, res) => {
  axios.get(APIurl + 'reviews', {
    headers: {
      Authorization: token.API_KEY
    },
    params: {
      sort: req.query.sort,
      product_id: req.query.product_id
    }
  }).then((data) => {
    res.status(200).send(data.data)
  })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
})

app.get('/reviews/meta', (req, res) => {
  console.log('got reviews request')
  axios.get(APIurl + 'reviews/meta', {
    headers: {
      Authorization: token.API_KEY
    },
    params: {
      product_id: req.query.product_id
    }
  }).then((data) => {
    res.status(200).send(data.data)
  })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
})

app.get('/qa/questions', (req, res) => {
  // console.log('questions and answers...', req);
  // let
  axios.get(APIurl + 'qa/questions/' + req._parsedUrl.search, {
    headers: {
      Authorization: token.API_KEY
    }
  })
    .then(data => {
    // console.log('I found the data');
    // console.log(data.data.results);
      res.status(200).send(data.data)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send(err)
    })
})

app.get('/qa/answers', (req, res) => {
  // console.log('questions and answers...', req);
  // let
  axios.get(APIurl + 'qa/questions/' + req.query.question_id + '/answers', {
    headers: {
      Authorization: token.API_KEY
    }
  })
    .then(data => {
    // console.log('I found the answers');
    // console.log(data.data.results);
      res.status(200).send(data.data.results)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send(err)
    })
})

app.put('/qa/helpfulquestion/', (req, res) => {
  console.log('helpful question', req.query.question_id)
  axios.put(APIurl + 'qa/questions/' + req.query.question_id + '/helpful', null, {
    headers: {
      Authorization: token.API_KEY
    }
  })
    .then(data => {
    // console.log('this is what I get from a successful post of helpful question', data);
      res.status(204).send(data)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send(err)
    })
})

app.put('/qa/answers/report', (req, res) => {
  console.log('made it this far', req.query.answer_id)
  axios.put(APIurl + 'qa/answers/' + req.query.answer_id + '/report', null, {
    headers: {
      Authorization: token.API_KEY
    }
  })
    .then(data => {
      res.status(200).send('ANSWER REPORTED')
    })
    .catch(err => {
      console.error(err)
      res.status(500).send(err)
    })
})

app.put('/qa/answers/helpful', (req, res) => {
  console.log('made it this far...', req.query.answer_id)
  axios.put(APIurl + 'qa/answers/' + req.query.answer_id + '/helpful', null, {
    headers: {
      Authorization: token.API_KEY
    }
  })
    .then(data => {
      res.status(200).send('ANSWER MARKED AS HELPFUL')
    })
    .catch(err => {
      console.error(err)
    })
})

app.post('/qa/answer', (req, res) => {
  // console.log(req);
  axios.post('/qa/questions/' + req.query.id + '/answers', {
    body: req.query.answer,
    name: req.query.nickname,
    email: req.query.email,
    photos: req.query.photos
  }, {
    headers: {
      Authorization: token.API_KEY
    }
  })
    .then(data => {
      res.status(200).send('new answer added')
    })
    .catch(err => console.error(err))
})

app.get('/api/*', async (req, res) => {
  const path = req.url.split('/api/')[1]
  try {
    const response = await axios.get(APIurl + path,
      {
        headers: {
          Authorization: token.API_KEY
        }
      }
    )
    res.json(response.data)
  } catch (err) {
    res.status(500).send(err)
  }
})

/// //RELATED PRODUCTS////
app.get('/product/:id/related', async (req, res) => {
  const options = {
    headers: {
      Authorization: token.API_KEY
    }
  }
  const productId = req.params.id
  try {
    let response = await axios.get(`${APIurl}products/${productId}/related`, options)
    const relatedIds = response.data

    const relatedProducts = []

    for (let i = 0; i < relatedIds.length; i++) {
      const relatedId = relatedIds[i]

      response = await axios.get(`${APIurl}products/${relatedId}`, options)
      const product = response.data

      response = await axios.get(`${APIurl}products/${relatedId}/styles`, options)
      const defaultStyle = response.data.results.find(style => style['default?']) || {}
      const productStyle = response.data.results.map(item => item.photos[0].url)

      response = await axios.get(`${APIurl}reviews/meta?product_id=${relatedId}`, options)
      const productRatings = response.data.ratings
      const productChar = response.data.characteristics

      relatedProducts.push({
        photo: productStyle[0],
        category: product.category,
        name: product.name,
        sale: defaultStyle.sale_price,
        price: product.default_price,
        rating: productRatings,
        characteristic: productChar
      })
    }
    res.status(200).send(relatedProducts)
  } catch (err) {
    res.status(500).send(err)
  }
})

app.listen(port, () => {
  console.log(`Server listening http://localhost:${port}`)
})
