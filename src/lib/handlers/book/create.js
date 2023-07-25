'use strict'

const { bookExists } = require('./common')
const { authorExists, insertAuthor } = require('../author/common')

module.exports = async function createBook(request, reply) {
  const collection = this.mongo.db.collection('books')
  if (await bookExists(this, request.body.book)) {
    reply.code(400)
    return { message: 'Error creating book' }
  }

  const inserted = []
  for (const author of request.body.authors) {
    const exists = await authorExists(this, author)
    if (!exists) {
      await insertAuthor(this, { author })
      inserted.push(author)
    }
  }

  const result = await collection.insertOne(request.body)
  reply.code(201)

  if (inserted.length) {
    console.log(JSON.stringify(inserted))
  }
  return {
    id: result.insertedId,
    message: 'Book created successfully'
  }
}
