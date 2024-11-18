require('dotenv').config();
const express = require('express');
const cors = require('cors');
const shortId = require('shortid');
const { stringIsAValidUrl } = require('./helper');
const { json, urlencoded } = require('body-parser');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;
const baseUrl = 'https://3000-freecodecam-boilerplate-p6yiz0dlmxp.ws-eu116.gitpod.io';
const urls = {};

app.use(cors());
app.use(json({ limit: '5mb' }))
app.use(urlencoded({ limit: '5mb', extended: false }))


app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', function (req, res) {
  const {url} = req.body;
  if(!stringIsAValidUrl(url)) {
    res.json({error: 'invalid url'})
  }

  const id = shortId.generate();
  urls[id] = url;
  res.json({ original_url : url, short_url : id})
});

app.get('/api/shorturl/:id', (req, res) => {
  const id = req.params.id;
  const url = urls[id];

  if (url) {
    res.redirect(url);
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
