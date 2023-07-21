const db = require('../infra/db');
const { getAutorId, insertAuthor } = require('./authors');

function list(params) {
  const criteria = filter(params);
  let query = `SELECT book.id, book.book_name as book, book.book_edition as edition, book.publication_year as year, author.author_name as author 
               FROM book INNER JOIN book_author ON book.id = book_author.book_id INNER JOIN author ON book_author.author_id = author.id 
               WHERE ${criteria.conditions} ORDER BY book.id`

  const result = db.query(query);
  const data = parse(result);

  return {
    data,
    meta: criteria.meta
  }
}

function filter(params) {
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

function parse(result) {
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

function insert(book) {
  validate(book);

  try {
    db.transaction.begin();

    const { name, edition, year, authors } = book;
    const result = db.run('INSERT INTO book (book_name, book_edition, publication_year) VALUES (@name, @edition, @year)', { name, edition, year });

    if (result.changes) {
      insertAuthors(result.lastInsertRowid, authors);
    }
    db.transaction.commit();

    return {
      message: 'Book created successfully'
    }
  }
  catch (err) {
    db.transaction.rollback();
    
    throw {
      status: 400,
      message: 'Error creating book'
    }
  }

}

function insertAuthors(book_id, authors) {
  for (const author of authors) {
    let author_id = getAutorId(author)

    if (!author_id) {
      author_id = insertAuthor(author)
    }

    db.run('INSERT INTO book_author (book_id, author_id) VALUES (@book_id, @author_id)', { book_id, author_id });
  }
}

function validate(book) {
  let messages = [];

  console.log(book);

  if (!book) {
    messages.push('No book is provided');
  }

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

  if (messages.length) {
    const error = new Error(messages.join());
    error.statusCode = 400;

    throw error;
  }
}

module.exports = {
  list,
  insert
}
