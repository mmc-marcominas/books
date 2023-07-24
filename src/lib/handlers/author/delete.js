'use strict'

module.exports = async function deleteAuthor(request, reply) {
  const collection = this.mongo.db.collection('authors')
  const result = await collection.deleteOne({
    _id: this.mongo.ObjectId(request.params.id)
  })
  if (result.deletedCount === 0) {
    const error = new Error('Author not found: ' + request.params.id)
    error.status = 404
    throw error
  }
  return { id: request.params.id }
}
