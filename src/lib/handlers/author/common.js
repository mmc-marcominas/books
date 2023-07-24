'use strict'

async function authorExists(collection, author) {
  const docs = await collection.find({ author }).toArray()
  return docs.length
}

module.exports = {
  authorExists
}
