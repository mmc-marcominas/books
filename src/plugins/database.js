'use strict'

const fp = require('fastify-plugin')
const collections = {
  authors: "authors",
  books: "books"
}

/** 
* Check if a given collectionName is on collections enum.
* @summary To avoid typo mistakes we use a enum to name each collection but in some cases write them will be necessary like on a hardcoded registration. This method throw a error if value not found on enum.
* @param {String} collectionName - Name of collection that must be on enum collections.
* @return {Error} An error with 404 status will be throw if name not in enum.
*/
function validateCollectionNames(collectionName) {
  if (!Object.keys(collections).includes(collectionName)) {
    const error = new Error(`Invalid collectionName: ${collectionName}`)
    error.status = 404
    throw error
  }
}

function decorateFastifyInstance(fastify, opts) {

  /** 
  * Check if a given filter return some value from database.
  * @summary Check if a given filter return some value on default collection set on context initialization.
  * @param {Object} conditions - A valid filter to be applyed on query.
  * @return {Boolean} If some value returned, true otherwise false.
  */
  async function exists(conditions) {
    validateCollectionNames(opts.collectionName)
    const collection = fastify.mongo.db.collection(opts.collectionName)
    const items = await collection.find(conditions).toArray()
    return items.length
  }

  /** 
  * Create a document on default collection.
  * @param {Object} item - Document to be created.
  * @param {Function} callback - A function to be executed on return statement if specified.
  * @return {Object} It will return document inserted id or callback executionresults if sent a callback.
  */
  async function create(item, callback = undefined) {
    validateCollectionNames(opts.collectionName)
    const collection = fastify.mongo.db.collection(opts.collectionName)
    const result = await collection.insertOne(item)

    if (callback) {
      return callback(result)
    }

    return { id: result.insertedId }
  }

  /** 
  * List all documents on default collection.
  * @return {Array} List of all documents on default collection with it's ids parsed as string.
  */
  async function read() {
    const collection = fastify.mongo.db.collection(opts.collectionName)
    const items = await collection.find().toArray()
    const result = items.map(d => {
      d.id = d._id.toString()
      return d
    })

    return result
  }

  function normalize(book) {
    const fields = Object.entries(book)
      .filter(([_, v]) => v != null)
    return Object.fromEntries(fields)
  }

  /** 
  * Parse given values on a author model.
  * @param {Object} values - Object with property of a author to be parsed.
  * @return {Object} A author model with valid properties sent on values param.
  */
  function parseAuthor(values) {
    const { author } = values
    const document = {
      author
    }

    return normalize(document)
  }

  const database = {
    collections,
    exists,
    parseAuthor,

    create,
    read
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
