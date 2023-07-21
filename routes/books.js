const express = require('express');
const router = express.Router();
const books = require('../services/books');

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
    const result = books.insert(req.body);
    res.status(result.status);
    res.json(result);
  } catch(err) {
    next(err);
  }
});

module.exports = router;
