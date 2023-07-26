'use strict'

/** 
* Take a given stream and convert it in a utf8 string.
* @param {stream} stream - Stream to be converted.
* @return {String} Stream content converted as utf8 string.
*/
async function toString(stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  })
}

/** 
* Get content of a file sent on a http request.
* @summary  Get file content sent on via http request and convert into string
* @param {Request} request - HTTP request with file object.
* @return {String} File content as utf8 string.
*/
async function getContent(request) {
  const data = await request.file()

  if (!data) {
    return null
  }

  return await toString(data.file)
}

module.exports = {
  getContent
}
