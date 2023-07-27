'use strict'

const { mongoId } = require('../common')
const { book } = require('./book')
const { list } = require('./list')

module.exports = {
  id: mongoId,
  input: book,
  update: book,
  list
}
