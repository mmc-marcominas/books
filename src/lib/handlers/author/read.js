'use strict'

module.exports = async function readAuthors(request, reply) {
  const collection = this.mongo.db.collection('authors')
  const docs = await collection.find().toArray()
  const data = docs.map(d => {
    d.id = d._id.toString()
    return d
  })
  return { data }
}
