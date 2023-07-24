'use strict'

const authorInput = {
  type: 'object',
  additionalProperties: false,
  properties: {
    author: {
      type: 'string',
      minLength: 1,
      maxLength: 100
    }
  },
  required: ['author']
}

module.exports = {
  authorInput
}
