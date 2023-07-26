'use strict'

/**
* Author model list.
* @property {Array} items - Author`s list.
* @property {String} id - Author id.
* @property {String} author - Author name.
*/
const list =
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
  list
}
