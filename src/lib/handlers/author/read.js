'use strict'

module.exports = async function readAuthors(request, reply) {
  const data = await this.database.read()
  return { data }
}
