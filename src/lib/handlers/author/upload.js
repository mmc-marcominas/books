'use strict'

const upload = require('../file')
const { authorExists, insertAuthor } = require('./common')

module.exports = async function uploadAuthor(request, reply) {
  const content = await upload.getContent(request)
  const authors = `${content}`.split('\n')

  if (!authors || !authors.length || !authors[0].startsWith('author')) {
    reply.code(400)
    return { message: 'Error uploading author' }
  }

  authors.shift()
  authors.forEach(async (item) => {
    const author = item.replace(/(\r\n|\n|\r)/gm, "");
    if (!await authorExists(this, author)) {
      await insertAuthor(this, {author})
    }
  });

  reply.code(200)
  return { message: 'Authors uploaded successfully' }
}
