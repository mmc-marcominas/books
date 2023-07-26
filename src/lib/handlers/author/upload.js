'use strict'

const upload = require('../file')

module.exports = async function uploadAuthor(request, reply) {
  const content = await upload.getContent(request)
  const authors = `${content}`.split('\n')

  if (!authors || !authors.length || !authors[0].startsWith('author')) {
    reply.code(400)
    return { message: 'Error uploading author' }
  }

  authors.shift()
  for (const item of authors) {
    const author = item.replace(/(\r\n|\n|\r)/gm, "");
    if (!await this.database.exists({ author})) {
      await this.database.create({ author })
    }
  }

  reply.code(200)
  return { message: 'Authors uploaded successfully' }
}
