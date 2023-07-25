'use strict'

async function authorExists(plugin, author) {
  const authors = plugin.mongo.db.collection('authors')
  const items = await authors.find({ author }).toArray()
  return items.length
}

async function insertAuthor(plugin, author) {
  const authors = plugin.mongo.db.collection('authors')
  const result = await authors.insertOne(author)
  return { id: result.insertedId }
}

module.exports = {
  authorExists,
  insertAuthor
}
