'use strict'

module.exports = async function createAuthor(request, reply) {
  const name = this.database.collections.authors

  if (await this.database.exists(name, { ... request.body })) {
    reply.code(400)
    return { message: 'Error creating author' }
  }

  const result = await this.database.create(name, request.body)
  reply.code(201)

  return {
    id: result.id,
    message: 'Author created successfully'
  }
}
