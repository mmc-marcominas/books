const db = require('../infra/db');

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

module.exports = {
  list
}
