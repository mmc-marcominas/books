const AuthorService = require('./authors');

class BookService {
  constructor(db) {
    this.db = db;
    this.authorService = new AuthorService(db);
  }

  list(params) {
    const criteria = filter(params);
    let query = `SELECT book.id, book.book_name as book, book.book_edition as edition, book.publication_year as year, author.author_name as author 
                 FROM book INNER JOIN book_author ON book.id = book_author.book_id INNER JOIN author ON book_author.author_id = author.id 
                 WHERE ${criteria.conditions} ORDER BY book.id`

    const result = this.db.query(query);
    const data = parse(result);

    return {
      data,
      meta: criteria.meta
    }
  }

  insert(book) {
    validate(book);

    try {
      this.db.transaction.begin();

      const { name, edition, year, authors } = book;
      const result = this.db.run('INSERT INTO book (book_name, book_edition, publication_year) VALUES (@name, @edition, @year)', { name, edition, year });

      if (result.changes) {
        this.insertAuthors(result.lastInsertRowid, authors);
      }
      this.db.transaction.commit();

      return {
        message: 'Book created successfully'
      }
    }
    catch (err) {
      this.db.transaction.rollback();

      throw {
        status: 400,
        message: 'Error creating book'
      }
    }

  }

  insertAuthors(book_id, authors) {
    for (const author of authors) {
      let author_id = this.authorService.getAutorId(author)

      if (!author_id) {
        author_id = this.authorService.insertAuthor(author)
      }

      this.db.run('INSERT INTO book_author (book_id, author_id) VALUES (@book_id, @author_id)', { book_id, author_id });
    }
  }

  update(id, book) {
    validate(book);

    try {
      this.db.transaction.begin();
      const { name, edition, year, authors } = book;
      const result = this.db.run(`UPDATE book SET book_name = @name, book_edition = @edition, publication_year = @year WHERE id = @id`, { id, name, edition, year });

      if (result.changes) {
        this.db.run('DELETE FROM book_author WHERE book_id = @id', { id });
        this.insertAuthors(id, authors);
      }
      this.db.transaction.commit();

      return {
        message: 'Book updated successfully'
      }
    }
    catch (err) {
      this.db.transaction.rollback();

      throw {
        status: 400,
        message: 'Error updating book'
      }
    }
  }

  delete(id) {
    const authors = this.db.run('DELETE FROM book_author WHERE book_id = @id', { id });

    if (authors.changes) {
      const book = this.db.run('DELETE FROM book WHERE id = @id', { id });
      if (book.changes) {
        return {
          message: 'Book deleted successfully'
        }
      }
    }

    throw {
      status: 400,
      message: 'Error on deleting book'
    };
  }
}

const validate = (book) => {
  let messages = [];

  if (!book) {
    messages.push('No book is provided');
  }
  else {
    if (!book.name) {
      messages.push('Name is empty');
    }

    if (!book.edition) {
      messages.push('Edition is empty');
    }

    if (!book.year) {
      messages.push('Publication year is empty');
    }

    if (!book.authors || book.authors.length < 1) {
      messages.push('Authors is empty');
    }
  }

  if (messages.length) {
    const error = new Error(messages.join(', '));
    error.statusCode = 400;

    throw error;
  }
}

const filter = (params) => {
  const { book, edition, year, author } = params;
  const meta = {};
  let conditions = '1 = 1'

  if (book) {
    conditions += ` AND book.book_name LIKE '%${book}%'`
    meta.book = book
  }

  if (edition) {
    conditions += ` AND book.book_edition = ${edition}`
    meta.edition = edition
  }

  if (year) {
    conditions += ` AND book.publication_year = ${year}`
    meta.year = year
  }

  if (author) {
    conditions += ` AND book.id IN (SELECT book_author.book_id FROM author INNER JOIN book_author ON book_author.author_id = author.id WHERE author.author_name = '${author}')`
    meta.author = author
  }

  return {
    conditions,
    meta
  }
}

const parse = (result) => {
  const books = [...new Map(result.map(row => [row['id'], row]))]
  const data = [];

  for (const [id, book] of books) {
    book.authors = [];
    for (const item of result.filter(item => item.id === id)) {
      book.authors.push(item.author);
    }

    delete (book.author)
    data.push(book);
  }

  return data;
}

module.exports = BookService
