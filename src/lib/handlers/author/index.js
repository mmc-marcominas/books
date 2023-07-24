const createAuthor = require('./create')
const readAuthors = require('./read')
const updateAuthor = require('./update')
const uploadAuthor = require('./upload')
const deleteAuthor = require('./delete')

module.exports = {
  createAuthor,
  readAuthors,
  updateAuthor,
  uploadAuthor,
  deleteAuthor
}
