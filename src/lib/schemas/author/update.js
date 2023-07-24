'use strict'

const authorUpdate = {
  type: 'object',
  additionalProperties: false,
  properties: {
    author: {
      type: 'string',
      minLength: 1,
      maxLength: 100
    }
  }
}

module.exports = {
  authorUpdate
}
