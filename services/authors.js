class AuthorService {
  constructor(db) {
    this.db = db;
  }

  list() {
    const query = `SELECT author.id, author.author_name as author FROM author ORDER BY author.id`;
    const data = this.db.query(query);

    return {
      data
    };
  }

  upload(authors) {
    validate(authors);
    authors.shift();

    let message = 'Authors uploaded successfully';
    for (const author of authors) {
      const inserted = this.insert(author);
      if (inserted !== 'Author created successfully') {
        message = inserted;
      }
    }

    return { message };
  }

  insert(author) {
    this.insertAuthor(author);

    return {
      message: 'Author created successfully'
    };
  }

  getAutorId(author) {
    const query = `SELECT author.id FROM author WHERE author.author_name = '${author}'`;
    const data = this.db.query(query);

    return data.length === 1 ? data[0].id : null;
  }

  insertAuthor(author) {
    if (!author) {
      throw {
        status: 400,
        message: 'Missing author name'
      };
    }

    try {
      const name = author.replace(/(\r\n|\n|\r)/gm, "");
      const result = this.db.run('INSERT INTO author (author_name) VALUES (@name)', { name });

      return result.lastInsertRowid;
    }
    catch {
      throw {
        status: 400,
        message: 'Error creating author'
      };
    }
  }
};

const validate =(authors) => {
  const messages = [];

  if (!authors) {
    messages.push('No authors was provided');
  }

  if (authors && !authors[0].startsWith('author')) {
    messages.push('File without author header' + authors[0]);
  }

  if (messages.length) {
    throw {
      status: 400,
      message: messages.join()
    };
  }
}

module.exports = AuthorService
