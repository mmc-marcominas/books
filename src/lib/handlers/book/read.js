'use strict'

module.exports = async function readBooks(request, reply) {
  const data = await this.database.read()
  return { data }
}
