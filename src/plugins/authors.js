'use strict'

const handlers = require('../lib/handlers/author')
const schemas = require('../lib/schemas/author')

function authorPlugin(app, opts, next) {
  app.register(require('fastify-mongodb'), opts.mongo)
  app.register(require('./database'), { collectionName: 'authors' })

  app.post('/authors', {
    schema: {
      body: schemas.input
    }
  }, handlers.createAuthor)

  app.get('/authors', {
    schema: {
      response: {
        200: schemas.list
      }
    }
  }, handlers.readAuthors)

  next()
}

module.exports = authorPlugin
