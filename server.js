'use strict';

const express = require('express');
// Load array of notes

const data = require('./db/notes');

const app = express();

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  //lets us retrieve the searchTerm from the query.string on req.query object
  const searchTerm = req.query.searchTerm;
  console.log(searchTerm);
  //filter through the array from searchterm and return results
  if (searchTerm) {
    let filtered = data.filter(item => item.title.includes(searchTerm));
    res.json(filtered);
  } else {
    res.json(data);
  }
});

app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);  
}).on('error', err => {
  console.error(err);
});

// INSERT EXPRESS APP CODE HERE...

