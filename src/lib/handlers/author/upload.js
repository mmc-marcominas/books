'use strict'

const upload = require('../file')

/** 
* Bulk insert authors according uploade content csv file.
* @summary Process a csv authors file inserting any author that already not insertede yet.
* @param {Request} request - HTTP request object with id in params and author in body.
* @param {Response} reply - HTTP response object.
* @return {Object} Return success insertion message otherwise a error message.
*/
module.exports = async function uploadAuthor(request, reply) {
  const content = await upload.getContent(request)
  const authors = `${content}`.split('\n')

  if (!authors || !authors.length || !authors[0].startsWith('author')) {
    reply.code(400)
    return { message: 'Error uploading author' }
  }

  authors.shift()
  for (const item of authors) {
    const name = item.replace(/(\r\n|\n|\r)/gm, "");
    const author = this.database.parseAuthor({ author: name})
    if (!await this.database.exists(author)) {
      await this.database.create(author)
    }
  }

  reply.code(200)
  return { message: 'Authors uploaded successfully' }
}
