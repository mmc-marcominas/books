const createAuthor = require('./create')
const readAuthors = require('./read')
const updateAuthor = require('./update')
const deleteAuthor = require('./delete')
const uploadAuthor = require('./upload')

module.exports = {
  createAuthor,
  readAuthors,
  updateAuthor,
  deleteAuthor,
  uploadAuthor
}
