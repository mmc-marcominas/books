'use strict'

const fp = require('fastify-plugin')

function decorateFastifyInstance(fastify) {

  const collections = {
    authors: "authors",
    books: "books"
  }

  async function exists(collectionName, condictions) {
    const collection = fastify.mongo.db.collection(collectionName)
    const items = await collection.find(condictions).toArray()
    return items.length
  }

  async function create(collectionName, item, callback = undefined) {
    const collection = fastify.mongo.db.collection(collectionName)
    const result = await collection.insertOne(item)

    if (callback) {
      return callback(result)
    }

    return { id: result.insertedId }
  }

  async function deleteOne(collectionName, id, callback = undefined) {
    const collection = fastify.mongo.db.collection(collectionName)
    const result = await collection.deleteOne({
      _id: fastify.mongo.ObjectId(id)
    })

    if (callback) {
      return callback(result)
    }

    return { deleted: result.deletedCount > 0 }
  }

  async function read(collectionName) {
    const collection = fastify.mongo.db.collection(collectionName)
    const items = await collection.find().toArray()
    const result = items.map(d => {
      d.id = d._id.toString()
      return d
    })

    return result
  }

  async function update(collectionName, id, values) {
    const collection = fastify.mongo.db.collection(collectionName)
    const result = await collection.updateOne(
      { _id: fastify.mongo.ObjectId(id) },
      { $set: values }
    )
    const updated = result.matchedCount !== 0

    return { updated }
  }

  function normalize(book) {
    const fields = Object.entries(book)
                         .filter(([_, v]) => v != null)
    return Object.fromEntries(fields)
  }
  
  function parseBook(values) {
    const { book, edition, year, authors } = values
    const document = {
      book: book,
      edition: edition,
      year: year,
      authors: authors
    }
  
    return normalize(document)
  }
  
  const database = {
    collections,
    exists,
    parseBook,

    create,
    read,
    update,
    delete: deleteOne
  }

  if (!fastify.database) {
    fastify.decorate('database', database)
  }
}

async function fastifyDatabase(fastify) {
  decorateFastifyInstance(fastify)
}

module.exports = fp(fastifyDatabase, {
  fastify: '4.x',
  name: 'database'
})

module.exports.default = fastifyDatabase
