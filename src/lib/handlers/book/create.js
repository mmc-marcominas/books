'use strict'

/** 
* Create a document on books collection.
* @param {Request} request - HTTP request with book object in body.
* @param {Response} reply - HTTP response object.
* @return {Object} It will return created document id and message on succes or HTTP 440 error if not.
*/
module.exports = async function createBook(request, reply) {
  const authors = this.database.collections.authors

  if (await this.database.exists({ book: request.body.book })) {
    reply.code(400)
    return { message: 'Error creating book' }
  }

  const inserted = []
  for (const author of request.body.authors) {
    const exists = await this.database.existsIn(authors, { author })
    if (!exists) {
      await this.database.createIn(authors, { author })
      inserted.push(author)
    }
  }

  const result = await this.database.create({... request.body})
  reply.code(201)

  return {
    id: result.Id,
    message: 'Book created successfully'
  }
}
