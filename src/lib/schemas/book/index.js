'use strict'

const { bookInput } = require('./input')
const { bookUpdate } = require('./update')
const { bookList } = require('./list')
const { mongoId } = require('../common')

module.exports = {
  id: mongoId,
  input: bookInput,
  update: bookUpdate,
  list: bookList
}
