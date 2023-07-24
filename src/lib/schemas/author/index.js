'use strict'

const { authorInput } = require('./input')
const { authorUpdate } = require('./update')
const { authorList } = require('./list')
const { mongoId } = require('../common')

module.exports = {
  id: mongoId,
  input: authorInput,
  update: authorUpdate,
  list: authorList
}
