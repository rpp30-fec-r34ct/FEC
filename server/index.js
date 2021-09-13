const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const APIurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/';
const token = require('./config.js');

app.use(express.static('client/dist'));
app.use('/product/:id', express.static('client/dist'));

app.get('/api/*', async (req, res) => {
  let path = req.url.split('/api/')[1]
  try {
    let response = await axios.get(APIurl + path,
      {
        headers: {
        'Authorization': token.API_KEY
        }
      }
    );
    res.json(response.data);
  } catch(err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server listening http://localhost:${port}`);
})

