'use strict'

const { notFoundError } = require('../common')

/** 
* Update a author.
* @summary Update a author according id sent on HTTP params and value from request body.
* @param {Request} request - HTTP request object with id in params and author in body.
* @param {Response} reply - HTTP response object.
* @return {Object} Return object id and success message if update occours otherwise throw error.
*/
module.exports = async function updateAuthor(request, reply) {
  const { id } = request.params
  const values = {
    author: request.body.author
  }

  const result = await this.database.update(id, values)
  if (!result.updated) {
    throw notFoundError('Author', id)
  }

  return {
    id: id,
    message: "Author updated successfully"
  }
}
