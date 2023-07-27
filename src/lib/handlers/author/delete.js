'use strict'

const { notFoundError } = require('../common')

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
    throw notFoundError('Author', id)
  }

  return {
    id: id,
    message: "Author deleted successfully"
  }
}
