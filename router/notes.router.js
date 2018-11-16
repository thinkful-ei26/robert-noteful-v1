'use strict';

const express = require('express');
const router = express.Router();

const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

router.get('/notes', (req, res, next) => {
  const { searchTerm } = req.query;

  notes.filter(searchTerm) 
    .then(list => {
      res.json(list); // responds with filtered array
    })
    .catch(err => {
      return next(err); // goes to error handler
    });
});

router.get('/notes/:id', (req, res) => {
  const id = req.params.id;

  notes.find(id)
    .then(item => {
      if (item) {
        res.json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

router.put('/notes/:id', (req, res, next) => {
  const id = req.params.id;

  const updateObj = {};
  const updateableFields = ['title', 'content'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  if (!updateObj.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  notes.update(id, updateObj) 
    .then(item => {
      if (item) {
        res.json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      if (err) {
        return next(err);
      }
    });
});
// Post (insert) an item
router.post('/notes', (req, res, next) => {
  const { title, content } = req.body;

  const newItem = { title, content };
  /***** Never trust users - validate input *****/
  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  notes.create(newItem) 
    .then(item => {
      if (item) {
        res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      return next(err);
    });
});

router.delete('/notes/:id', (req, res, next) => {
  const id = req.params.id;

  notes.delete(id)
    .then(item => {
      if (item) {
        console.log(`Deleted note ${id}`);
        res.status(204).end();
      }else{
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});


router.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});
  

module.exports = router;