'use strict'

/** 
* Remove a document on books collection.
* @param {Request} request - HTTP request object with id in params.
* @param {Response} reply - HTTP response object.
* @return {Object} It will return document deleted id or callback execution results if sent a callback.
*/
module.exports = async function deleteBook(request, reply) {
  const { id } = request.params
  const result = await this.database.delete(id)

  if (!result.deleted) {
    const error = new Error('Book not found: ' + id)
    error.status = 404
    throw error
  }

  return { id }
}
