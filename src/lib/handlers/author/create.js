'use strict'

module.exports = async function createAuthor(request, reply) {
  if (await this.database.exists({ ... request.body })) {
    reply.code(400)
    return { message: 'Error creating author' }
  }

  const result = await this.database.create(request.body)
  reply.code(201)

  return {
    id: result.id,
    message: 'Author created successfully'
  }
}
