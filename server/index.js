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
  // console.log('questions and answers...', req);
  // let
  axios.get(APIurl + 'qa/questions/' + req._parsedUrl.search, {
    headers: {
      'Authorization': token.API_KEY
    }
  })
  .then(data => {
    // console.log('I found the data');
    // console.log(data.data.results);
    res.status(200).send(data.data);
  })
  .catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

app.get('/qa/answers', (req, res) => {
  // console.log('questions and answers...', req);
  // let
  axios.get(APIurl + 'qa/questions/' + req.query.question_id + '/answers', {
    headers: {
      'Authorization': token.API_KEY
    }
  })
  .then(data => {
    // console.log('I found the answers');
    // console.log(data.data.results);
    res.status(200).send(data.data.results);
  })
  .catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});


app.put('/qa/helpfulquestion/', (req, res) => {
  console.log('helpful question', req.query.question_id);
  axios.put(APIurl + 'qa/questions/' + req.query.question_id + '/helpful', null, {
    headers: {
      'Authorization': token.API_KEY
    }
  })
  .then(data => {
    // console.log('this is what I get from a successful post of helpful question', data);
    res.status(204).send(data);
  })
  .catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});



app.put('/qa/answers/report', (req, res) => {
  console.log('made it this far', req.query.answer_id);
  axios.put(APIurl + 'qa/answers/' + req.query.answer_id + '/report', null, {
    headers: {
      'Authorization': token.API_KEY
    }
  })
  .then(data => {
    res.status(200).send('ANSWER REPORTED');
  })
  .catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

app.put('/qa/answers/helpful', (req, res) => {
  console.log('made it this far...', req.query.answer_id);
  axios.put(APIurl + 'qa/answers/' + req.query.answer_id + '/helpful', null, {
    headers: {
      'Authorization': token.API_KEY
    }
  })
  .then(data => {
    res.status(200).send('ANSWER MARKED AS HELPFUL');
  })
  .catch(err => {
    console.error(err);
  });
});

app.post('/qa/answer', (req, res) => {
  // console.log(req);
  axios.post('/qa/questions/' + req.query.id + '/answers', {
    body: req.query.answer,
    name: req.query.nickname,
    email: req.query.email,
    photos: req.query.photos
  }, {
    headers: {
      'Authorization': token.API_KEY
    }
  })
  .then(data => {
    res.status(200).send('new answer added');
  })
  .catch(err => console.error(err));
});


app.listen(port, () => {
  console.log(`Server listening http://localhost:${port}`);
})

