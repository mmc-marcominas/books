'use strict'

module.exports = async function readAuthors(request, reply) {
  const name = this.database.collections.authors
  const data = await this.database.read(name)
  return { data }
}
