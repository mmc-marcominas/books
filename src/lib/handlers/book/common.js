'use strict'

async function bookExists(plugin, book) {
  const collection = plugin.mongo.db.collection('books')
  const items = await collection.find({ book }).toArray()
  return items.length
}

module.exports = {
  bookExists
}
