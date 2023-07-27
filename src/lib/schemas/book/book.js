'use strict'

/**
* Book model.
* @property {String} book - Book name.
* @property {number} edition - Book edition.
* @property {number} year - Book year.
* @property {Array} authors - Book author list.
*/
const book = {
  type: 'object',
  additionalProperties: false,
  properties: {
    book: {
      type: 'string',
      minLength: 1,
      maxLength: 100
    },
    edition: {
      type: 'number'
    },
    year: {
      type: 'number'
    },
    authors: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  },
  required: ['book', 'edition', 'year', 'authors']
}

