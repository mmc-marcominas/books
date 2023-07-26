'use strict'

/**
* Book model list.
* @property {Array} items - Author`s list.
* @property {String} id - Book id.
* @property {String} book - Book name.
* @property {String} edition - Book edition.
* @property {String} year - Book year.
* @property {String} authors - Book author list.
*/
const list =
{
  type: 'object',
  properties: {
    data: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          id: { type: 'string' },
          book: { type: 'string' },
          edition: { type: 'number' },
          year: { type: 'number' },
          authors: {
            type: 'array',
            properties: {
              author: { type: 'string' },
            }
          }
        }
      }
    }
  }
}

module.exports = {
  list
}
