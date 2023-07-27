'use strict'

const handlers = require('../lib/handlers/book')
const schemas = require('../lib/schemas/book')

function bookPlugin(app, opts, next) {
  app.register(require('fastify-mongodb'), opts.mongo)
  app.register(require('./database'), { collectionName: 'books' })

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

  next()
}

module.exports = bookPlugin
