'use strict';

const express = require('express');
// Load array of notes

const data = require('./db/notes');

const app = express();

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  res.json(data);
});

app.get('/api/notes/:bookmarkId', (req, res) => { 
  const bookmark = data.find(item => item.id === Number(req.params.bookmarkId));
  String(bookmark.id); 
  res.json(bookmark); 
});

app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);  
}).on('error', err => {
  console.error(err);
});

// INSERT EXPRESS APP CODE HERE...
