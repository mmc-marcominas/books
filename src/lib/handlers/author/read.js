'use strict'

/** 
* List all documents on authors collection.
* @param {Request} request - HTTP request object.
* @param {Response} reply - HTTP response object.
* @return {Array} List of all authors with it's ids parsed as string.
*/
module.exports = async function readAuthors(request, reply) {
  const data = await this.database.read()
  return { data }
}
