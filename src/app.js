'use strict'

const fp = require('fastify-plugin')
const authorPlugin = require('./plugins/authors')

module.exports = fp(async function fastify(app, opts) {
  await app.register(require('@fastify/env'), {
    data: opts.envData,
    schema: {
      type: 'object',
      properties: {
        PORT: { type: 'integer', default: 3000 },
        NODE_ENV: { type: 'string' },
        MONGO_URL: { type: 'string' }
      }
    }
  })

  app.register(authorPlugin, {
    mongo: {
      url: app.config.MONGO_URL
    }
  })
})
