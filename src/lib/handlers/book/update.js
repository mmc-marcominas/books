'use strict'

module.exports = async function updateBook(request, reply) {
  const { id } = request.params

  const values = this.database.parseBook(request.body)
  const result = await this.database.update(id, values)
  
  if (!result.updated) {
    const error = new Error('Book not found: ' + request.params.id)
    error.status = 404
    throw error
  }
  return {
    id: id,
    message: "Book updated successfully"
  }
}
