'use strict'

module.exports = async function deleteAuthor(request, reply) {
  const name = this.database.collections.authors
  const { id } = request.params
  const result = await this.database.delete(name, id)

  if (!result.deleted) {
    const error = new Error('Author not found: ' + id)
    error.status = 404
    throw error
  }

  return {
    id: id,
    message: "Author updated successfully"
  }
}
