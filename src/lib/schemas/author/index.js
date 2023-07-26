'use strict'

const { list } = require('./list')
const { mongoId } = require('../common')

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
  id: mongoId,
  input: author,
  update: author,
  list
}
