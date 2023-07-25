'use strict'

const bookInput = {
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

module.exports = {
  bookInput
}
