'use strict'

async function toString (stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  })
}

async function getContent(request) {
  const data = await request.file()

  if(!data) {
    return null
  }

  return await toString(data.file)
}

module.exports = {
  getContent
}
