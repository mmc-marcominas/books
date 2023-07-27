'use strict'

/** 
* Create a document on books collection.
* @param {Request} request - HTTP request with book object in body.
* @param {Response} reply - HTTP response object.
* @return {Object} It will return created document id and message on succes or HTTP 440 error if not.
*/
module.exports = async function createBook(request, reply) {
  if (await this.database.exists({ book: request.body.book })) {
    reply.code(400)
    return { message: 'Error creating book - book already exists' }
  }

  const inserted = []
  const authors = this.database.collections.authors
  for (const author of request.body.authors) {
    const doc = this.database.parseAuthor({ author })
    if (!await this.database.existsIn(authors, doc)) {
      await this.database.createIn(authors, doc)
      inserted.push(author)
    }
  }

  const result = await this.database.create({ ...request.body })
  const message = {
    id: result.id,
    message: 'Book created successfully'
  }

  if (inserted.length) {
    message.insertedAuthors = inserted
  }
  reply.code(201)

  return message
}
