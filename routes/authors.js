const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');

const AuthorService = require('../services/authors');
const db = require('../infra/db');

const authors = new AuthorService(db);

/* List authors. */
router.get('/', function (req, res, next) {
  try {
    res.json(authors.list());
  } catch (err) {
    console.error(`Error while getting books `, err.message);
    next(err);
  }
});

/* Upload authors. */
router.post('/upload', function (req, res, next) {
  const form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    if (err) {
      next(err);
      return;
    }
    fs.readFile(files.file.filepath, 'utf8', (err, data) => {
      if (err) {
        const error = new Error(err);
        error.statusCode = 400;
        throw error;
      }

      const items = data.split('\n');
      result = authors.upload(items);
    });

    res.json({ "message": 'Authors uploaded successfully' });
  });
});

/* POST author */
router.post('/', function (req, res, next) {
  try {
    res.json(authors.insert(req.body.name));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
