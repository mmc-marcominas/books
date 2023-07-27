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
  async function exists(condictions) {
    return existsIn(opts.collectionName, condictions)
  }

  /**
  * Check if a given filter return some value from database.
  * @summary Check if a given filter return some value on a collection according valid collectionName param sent.
  * @param {String} collectionName - Collection name that must be on enum collections  - it's value must be on collections enum so use enum to avoid typos.
  * @param {Object} condictions - A valid filter to be applyed on query.
  * @return {Boolean} If some value returned by query result, true otherwise false.
  */
  async function existsIn(collectionName, condictions) {
    validateCollectionNames(collectionName)
    const collection = fastify.mongo.db.collection(collectionName)
    const items = await collection.find(condictions).toArray()
    return items.length
  }

  /** 
  * Create a document on default collection.
  * @param {Object} item - Document to be created.
  * @param {Function} callback - A function to be executed on return statement if specified.
  * @return {Object} It will return document inserted id or callback executionresults if sent a callback.
  */
  async function create(item, callback = undefined) {
    return createIn(opts.collectionName, item, callback)
  }

  /** 
  * Create a document on a specified collection.
  * @param {String} collectionName - Name of collection that must be on enum collections  - it's value be on enum collections so use this enum to avoid any typo.
  * @param {Object} item - Documento to be created.
  * @param {Function} callback - A function to be executed on return statement if specified.
  * @return {Object} It will return document inserted id or callback execution results if sent a callback.
  */
  async function createIn(collectionName, item, callback = undefined) {
    validateCollectionNames(collectionName)
    const collection = fastify.mongo.db.collection(collectionName)
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


  /** 
  * Update a document on default collection according value sent on id param and values.
  * @param {String} id - String representing id of document to be updated - it will be parsed on a ObjectId.
  * @param {Object} values - A function to be executed on return statement if specified.
  * @return {Object} Brief description of the returning value here.
  */
  async function update(id, values) {
    const collection = fastify.mongo.db.collection(opts.collectionName)
    const result = await collection.updateOne(
      { _id: fastify.mongo.ObjectId(id) },
      { $set: values }
    )
    const updated = result.matchedCount !== 0

    return { updated }
  }

  /** 
  * Remove a document on default collection according value sent on id param.
  * @param {String} id - String representing id of document to be updated - it will be parsed on a ObjectId.
  * @param {Function} callback - A function to be executed on return statement if specified.
  * @return {Object} It will return document deleted id or callback execution results if sent a callback.
  */
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

  /** 
  * Parse given values on a book model.
  * @param {Object} values - Object with property of a book to be parsed.
  * @return {Object} A book model with valid properties sent on values param.
  */
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
    parseAuthor,
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
