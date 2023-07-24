'use strict'

const authorList = 
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
          author: { type: 'string' }
        }
      }
    }
  }
}

module.exports = {
  authorList
}
