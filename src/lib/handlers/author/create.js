'use strict'

/** 
* Create a document on author collection.
* @param {Request} request - HTTP request with book object in body.
* @param {Response} reply - HTTP response object.
* @return {Object} It will return created document id and message on succes or HTTP 440 error if not.
*/
module.exports = async function createAuthor(request, reply) {
  if (await this.database.exists({ ...request.body })) {
    reply.code(400)
    return { message: 'Error creating author - author already exists' }
  }

  const author = this.database.parseAuthor(request.body)
  const result = await this.database.create(author)
  reply.code(201)

  return {
    id: result.id,
    message: 'Author created successfully'
  }
}
