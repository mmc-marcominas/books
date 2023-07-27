'use strict'

/**
* Author model.
* @property {String} author - Author name.
*/
const author = {
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
  author
}
