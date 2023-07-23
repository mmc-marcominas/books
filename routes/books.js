const express = require('express');
const router = express.Router();

const BookService = require('../services/books');
const db = require('../infra/db');

const books = new BookService(db);

/* List books. */
router.get('/', function(req, res, next) {
  try {
    res.json(books.list(req.query));
  } catch(err) {
    console.error(`Error while getting books `, err.message);
    next(err);
  }
});

/* POST books */
router.post('/', function(req, res, next) {
  try {
    res.json(books.insert(req.body));
  } catch(err) {
    next(err);
  }
});

/* PUT books */
router.put('/:id', function(req, res, next) {
  try {
    res.json(books.update(req.params.id, req.body));
  } catch(err) {
    next(err);
  }
});

/* DELETE books */
router.delete('/:id', function(req, res, next) {
  try {
    res.json(books.delete(req.params.id));
  } catch(err) {
    next(err);
  }
});

module.exports = router;
