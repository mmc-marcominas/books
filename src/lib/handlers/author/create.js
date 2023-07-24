'use strict'

const { authorExists } = require('./common')

module.exports = async function createAuthor(request, reply) {
  const collection = this.mongo.db.collection('authors')
  if (await authorExists(collection, request.body.author)) {
    reply.code(400)
    return { message: 'Error creating author' }
  }

  const result = await collection.insertOne(request.body)
  reply.code(201)

  return {
    id: result.insertedId,
    message: 'Author created successfully'
  }
}
