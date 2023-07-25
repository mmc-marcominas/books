'use strict'

module.exports = async function deleteBook(request, reply) {
  const name = this.database.collections.books
  const { id } = request.params
  const result = await this.database.delete(name, id)

  if (!result.deleted) {
    const error = new Error('Book not found: ' + id)
    error.status = 404
    throw error
  }

  return { id }
}
