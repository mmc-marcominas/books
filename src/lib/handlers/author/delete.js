'use strict'

/** 
* Remove a document on author collection.
* @param {Request} request - HTTP request object with id in params.
* @param {Response} reply - HTTP response object.
* @return {Object} It will return document deleted id or callback execution results if sent a callback.
*/
module.exports = async function deleteAuthor(request, reply) {
  const { id } = request.params
  const result = await this.database.delete(id)

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
