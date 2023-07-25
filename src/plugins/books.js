'use strict'

const handlers = require('../lib/handlers/book')
const schemas = require('../lib/schemas/book')

function bookPlugin (app, opts, next) {
  app.register(require('fastify-mongodb'), opts.mongo)

  app.post('/books', {
    schema: {
      body: schemas.input
    }
  }, handlers.createBook)

  app.get('/books', {
    schema: {
      response: {
        200: schemas.list
      }
    }
  }, handlers.readBooks)

  app.put('/books/:id', {
    schema: {
      params: schemas.id,
      body: schemas.update
    }
  }, handlers.updateBook)

  app.delete('/books/:id', {
    schema: {
      params: schemas.id
    }
  }, handlers.deleteBook)

  next()
}

module.exports = bookPlugin
