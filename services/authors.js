const db = require('../infra/db');

function list() {
  const query = `SELECT author.id, author.author_name as author FROM author ORDER BY author.id`
  const data = db.query(query);

  return {
    data
  }
}

function upload(authors) {
  validate(authors);
  authors.shift();

  let message = 'Authors uploaded successfully';
  for (const author of authors) {
    const inserted = insert(author);
    if (inserted !== 'Author created successfully') {
      message = inserted
    }
  }

  return { message };
}

function validate(authors) {
  const messages = []

  if (!authors) {
    messages.push('No authors wss provided');
  }

  if (!authors[0].startsWith('author')) {
    messages.push('File without author header ' + authors[0]);
  }

  if (messages.length) {
    throw {
      status: 400,
      message: messages.join()
    };
  }
}

function insert(author) {
  try {
    insertAuthor(author);
    return {
      message: 'Author created successfully'
    }
  }
  catch (err) {
    throw {
      status: 400,
      message: 'Error creating author'
    };
  }
}

function getAutorId(author) {
  const query = `SELECT author.id FROM author WHERE author.author_name = '${author}'`
  const data = db.query(query);

  return  data.length === 1 ? data[0].id : null;
}

function insertAuthor(author) {
  if (!author) {
    throw {
      status: 400,
      message: 'Missing author name'
    };
  }

  const name = author.replace(/(\r\n|\n|\r)/gm, "")
  const result = db.run('INSERT INTO author (author_name) VALUES (@name)', { name });

  return result.lastInsertRowid;
}

module.exports = {
  list,
  insert,
  upload,
  getAutorId,
  insertAuthor
}
