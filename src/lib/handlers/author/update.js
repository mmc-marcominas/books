'use strict'

module.exports = async function updateAuthor(request, reply) {
  const collection = this.mongo.db.collection('authors')
  const result = await collection.updateOne(
    { _id: this.mongo.ObjectId(request.params.id) },
    {
      $set: {
        author: request.body.author
      }
    })
  if (result.matchedCount === 0) {
    const error = new Error('Author not found: ' + request.params.id)
    error.status = 404
    throw error
  }
  return { id: request.params.id }
}
