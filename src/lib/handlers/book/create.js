'use strict'

module.exports = async function createBook(request, reply) {
  const { authors, books } = this.database.collections

  if (await this.database.exists(books, { book: request.body.book })) {
    reply.code(400)
    return { message: 'Error creating book' }
  }

  const inserted = []
  for (const author of request.body.authors) {
    const exists = await this.database.exists(authors, { author })
    if (!exists) {
      await this.database.create(authors, { author })
      inserted.push(author)
    }
  }

  const result = await this.database.create(books, {... request.body})
  reply.code(201)

  return {
    id: result.Id,
    message: 'Book created successfully'
  }
}
