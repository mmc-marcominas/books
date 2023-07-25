'use strict'

const { authorExists, insertAuthor } = require('./common')

module.exports = async function createAuthor(request, reply) {
  if (await authorExists(this, request.body.author)) {
    reply.code(400)
    return { message: 'Error creating author' }
  }

  const result = await insertAuthor(this, request.body)
  reply.code(201)

  return {
    id: result.id,
    message: 'Author created successfully'
  }
}
