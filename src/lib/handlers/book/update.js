'use strict'

function normalize(book) {
  const fields = Object.entries(book)
                       .filter(([_, v]) => v != null)
  return Object.fromEntries(fields)
}

function getBook(values) {
  const { book, edition, year, authors } = values
  const document = {
    book: book,
    edition: edition,
    year: year,
    authors: authors
  }

  return normalize(document)
}

module.exports = async function updateBook(request, reply) {
  const collection = this.mongo.db.collection('books')
  const book = getBook(request.body)
  const result = await collection.updateOne(
    { _id: this.mongo.ObjectId(request.params.id) },
    { $set: book })
  if (result.matchedCount === 0) {
    const error = new Error('Book not found: ' + request.params.id)
    error.status = 404
    throw error
  }
  return { id: request.params.id }
}
