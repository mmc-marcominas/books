'use strict'

module.exports = async function updateAuthor(request, reply) {
  const { id } = request.params
  const values = {
    author: request.body.author
  }

  const result = await this.database.update(id, values)
  if (!result.updated) {
    const error = new Error('Author not found: ' + id)
    error.status = 404
    throw error
  }

  return {
    id: id,
    message: "Author updated successfully"
  }
}
