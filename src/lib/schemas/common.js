'use strict'

/**
* MongoDB id model.
* @property {String} author - Author`s name.
*/
const mongoId = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      minLength: 24,
      maxLength: 24
    }
  }
}

module.exports = {
  mongoId
}
