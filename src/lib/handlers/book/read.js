'use strict'

module.exports = async function readBooks(request, reply) {
  const collection = this.mongo.db.collection('books')
  const items = await collection.find().toArray()
  const data = items.map(d => {
    d.id = d._id.toString()
    return d
  })
  return { data }
}
