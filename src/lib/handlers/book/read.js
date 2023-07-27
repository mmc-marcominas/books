'use strict'

/** 
* List all documents of books collection.
* @param {Request} request - HTTP request object.
* @param {Response} reply - HTTP response object.
* @return {Array} List of all books with it's ids parsed as string.
*/
module.exports = async function readBooks(request, reply) {
  const data = await this.database.read()
  return { data }
}
