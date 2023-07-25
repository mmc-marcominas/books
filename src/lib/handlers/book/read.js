'use strict'

module.exports = async function readBooks(request, reply) {
  const name = this.database.collections.books
  const data = await this.database.read(name)
  return { data }
}
