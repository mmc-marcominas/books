'use strict'

const bookList = 
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
  bookList
}
