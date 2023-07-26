'use strict'

/** 
* Update a book.
* @summary Update a book according id sent on HTTP params and value from request body.
* @param {Request} request - HTTP request object with id in params and book in body.
* @param {Response} reply - HTTP response object.
* @return {Object} Return object id and success messaga if update occours otherwise throw error.
*/
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
