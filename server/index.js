const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')
const APIurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/'
const token = require('./config.js')

app.use('/product/:id', express.static('client/dist'))
app.use('/reviewPage/:id', express.static('client/dist'))
app.use('/product/:id/carousel', express.static('client/dist'))
app.use('/questions/:id', express.static('client/dist'))
app.use(express.json())




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

/////////////////////////----- QUESTIONS AND ANSWERS -----/////////////////////////
app.get('/qa/questions', (req, res) => {
  axios.get(APIurl + 'qa/questions/' + req._parsedUrl.search, {
    headers: {
      Authorization: token.API_KEY
    }
  })
    .then(data => {
      // console.log('testResponse', data.data.results[0].answers)
      res.status(200).send(data.data)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send(err)
    })
})

app.get('/qa/answers', (req, res) => {
  axios.get(APIurl + 'qa/questions/' + req.query.question_id + '/answers', {
    headers: {
      Authorization: token.API_KEY
    }
  })
    .then(data => {
      // console.log('answers', data.data.results)
      res.status(200).send(data.data.results)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send(err)
    })
})

app.put('/qa/helpfulquestion/', (req, res) => {
  // console.log(typeof req.query.question_id)
  axios.put(APIurl + 'qa/questions/' + req.query.question_id + '/helpful', null, {
    headers: {
      Authorization: token.API_KEY
    }
  })
    .then(data => {
      console.log('success?')
      res.sendStatus(200)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send(err)
    })
})

app.put('/qa/answers/report', (req, res) => {
  axios.put(APIurl + 'qa/answers/' + req.query.answer_id + '/report', null, {
    headers: {
      Authorization: token.API_KEY
    }
  })
    .then(data => {
      res.sendStatus(200)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send(err)
    })
})

app.put('/qa/answers/helpful', (req, res) => {
  console.log('made it this far...helpful question = ', req.query)
  axios.put(APIurl + 'qa/answers/' + req.query.answer_id + '/helpful', null, {
    headers: {
      Authorization: token.API_KEY
    }
  })
  .then(data => {
    console.log(data)
    res.status(200).send('ANSWER MARKED AS HELPFUL')
  })
  .catch(err => {
    console.error(err)
  })
})

app.post('/qa/newquestion', (req, res) => {
  axios({
    method: 'post',
    url: APIurl + 'qa/questions/',
    headers: {
      Authorization: token.API_KEY
    },
    data: {
      body: req.query.body,
      name: req.query.name,
      email: req.query.email,
      product_id: Number(req.query.product_id)
    }
  })
    .then(data => {
      res.send('new question added')
    })
    .catch(err => res.send(err))
})

app.post('/qa/answer', (req, res) => {
  console.log(req)
  axios({
    method: 'post',
    url: APIurl + 'qa/questions/' + req.query.id + '/answers',
    headers: {
      Authorization: token.API_KEY
    },
    data: {
      body: req.query.answer,
      name: req.query.nickname,
      email: req.query.email,
      photos: req.query.photos
    }
  })
    .then(data => {
      res.send('new answer added')
    })
    .catch(err => res.send(err))
})
/////////////////////////----- END OF QUESTIONS AND ANSWERS -----/////////////////////////

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

app.post('/api/*', async (req, res) => {
  const path = req.url.split('/api/')[1]
  try {
    const response = await axios(
      {
        method: 'POST',
        url: APIurl + path,
        headers: {
          Authorization: token.API_KEY
        },
        data: req.body
      }
    )
    res.status(201).send(response.data)
  } catch (err) {
    console.log(err)
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
