'use strict'

const bookUpdate = {
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
  required: ['book']
}

module.exports = {
  bookUpdate
}
