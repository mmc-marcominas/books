'use strict'

module.exports = async function deleteBook(request, reply) {
  const collection = this.mongo.db.collection('books')
  const result = await collection.deleteOne({
    _id: this.mongo.ObjectId(request.params.id)
  })
  if (result.deletedCount === 0) {
    const error = new Error('Book not found: ' + request.params.id)
    error.status = 404
    throw error
  }
  return { id: request.params.id }
}
