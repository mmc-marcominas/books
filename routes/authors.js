const express = require('express');
const router = express.Router();
const authors = require('../services/authors');
const fs = require('fs');

/* List authors. */
router.get('/', function (req, res, next) {
  try {
    res.json(authors.list());
  } catch (err) {
    console.error(`Error while getting books `, err.message);
    next(err);
  }
});

module.exports = router;
