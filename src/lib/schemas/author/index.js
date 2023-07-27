'use strict'

const { mongoId } = require('../common')
const { author } = require('./author')
const { list } = require('./list')

module.exports = {
  id: mongoId,
  input: author,
  list
}
