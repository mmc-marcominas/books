'use strict'

const { notFoundError } = require('../common')

/** 
* Remove a document of books collection.
* @param {Request} request - HTTP request object with id in params.
* @param {Response} reply - HTTP response object.
* @return {Object} It will return document deleted id on success otherwise thow an error.
*/
module.exports = async function deleteBook(request, reply) {
  const { id } = request.params
  const result = await this.database.delete(id)

  if (!result.deleted) {
    throw notFoundError('Book', id)
  }

  return {
    id: id,
    message: "Book deleted successfully"
  }
}
