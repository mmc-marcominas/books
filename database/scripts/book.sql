CREATE TABLE book (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  book_name text NOT NULL,
  book_edition INTEGER NOT NULL,
  publication_year INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE UNIQUE INDEX ix_book_edition ON book(book_name, book_edition);

INSERT INTO book(book_name, book_edition, publication_year) VALUES ('Desafio Backend com Node.js e SQLite', 1, 2022);
INSERT INTO book(book_name, book_edition, publication_year) VALUES ('Desafio Backend com Node.js e SQLite', 2, 2023);

SELECT book.id, book.book_name as book, book.book_edition as edition, book.publication_year as year, book.created_at as created FROM book ORDER BY book.id;
