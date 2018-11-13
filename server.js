'use strict';

const express = require('express');
// Load array of notes

const data = require('./db/notes');

const { PORT } = require('./config');

const app = express();

const logger = require('./middleware/logger.js');

app.use(express.static('public'));

app.use(logger);

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  let note = data.find(function(item) {
    return item.id === Number(id);
  });
  res.json(note);
});

app.get('/api/notes', (req, res) => {
  //lets us retrieve the searchTerm from the query.string on req.query object
  const searchTerm = req.query.searchTerm;
  //filter through the array from searchterm and return results
  if (searchTerm) {
    let filtered = data.filter(item => item.title.includes(searchTerm));
    res.json(filtered);
  } else {
    res.json(data);
  }
});

app.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);  
}).on('error', err => {
  console.error(err);
});

// INSERT EXPRESS APP CODE HERE...

