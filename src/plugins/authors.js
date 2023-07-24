'use strict'

const handlers = require('../lib/handlers/author')
const schemas = require('../lib/schemas/author')

function authorPlugin (app, opts, next) {
  app.register(require('fastify-mongodb'), opts.mongo)

  app.post('/authors', {
    schema: {
      body: schemas.input
    }
  }, handlers.createAuthor)

  app.post('/authors/upload', {
    
  }, handlers.uploadAuthor)

  app.get('/authors', {
    schema: {
      response: {
        200: schemas.list
      }
    }
  }, handlers.readAuthors)

  app.put('/authors/:id', {
    schema: {
      params: schemas.id,
      body: schemas.update
    }
  }, handlers.updateAuthor)

  app.delete('/authors/:id', {
    schema: {
      params: schemas.id
    }
  }, handlers.deleteAuthor)

  next()
}

module.exports = authorPlugin
