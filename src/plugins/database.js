'use strict'

const fp = require('fastify-plugin')
const collections = {
  authors: "authors",
  books: "books"
}

function validateCollectionNames(collectionName) {
  if (!Object.keys(collections).includes(collectionName)){
    const error = new Error(`Invalid collectionName: ${collectionName}`)
    error.status = 404
    throw error
  }
}

function decorateFastifyInstance(fastify, opts) {

  async function exists(condictions) {
    return existsIn(opts.collectionName, condictions)
  }

  async function existsIn(collectionName, condictions) {
    validateCollectionNames(collectionName)
    const collection = fastify.mongo.db.collection(collectionName)
    const items = await collection.find(condictions).toArray()
    return items.length
  }

  async function create(item, callback = undefined) {
    return createIn(opts.collectionName, item, callback)
  }

  async function createIn(collectionName, item, callback = undefined) {
    validateCollectionNames(collectionName)
    const collection = fastify.mongo.db.collection(collectionName)
    const result = await collection.insertOne(item)

    if (callback) {
      return callback(result)
    }

    return { id: result.insertedId }
  }

  async function deleteOne(id, callback = undefined) {
    const collection = fastify.mongo.db.collection(opts.collectionName)
    const result = await collection.deleteOne({
      _id: fastify.mongo.ObjectId(id)
    })

    if (callback) {
      return callback(result)
    }

    return { deleted: result.deletedCount > 0 }
  }

  async function read() {
    const collection = fastify.mongo.db.collection(opts.collectionName)
    const items = await collection.find().toArray()
    const result = items.map(d => {
      d.id = d._id.toString()
      return d
    })

    return result
  }

  async function update( id, values) {
    const collection = fastify.mongo.db.collection(opts.collectionName)
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
    existsIn,
    createIn,
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

async function fastifyDatabase(fastify, opts) {
  validateCollectionNames(opts?.collectionName)
  decorateFastifyInstance(fastify, opts)
}

module.exports = fp(fastifyDatabase, {
  fastify: '4.x',
  name: 'database'
})

module.exports.default = fastifyDatabase
