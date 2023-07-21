CREATE TABLE author (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author_name text NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE UNIQUE INDEX ix_author_name ON author(author_name);

INSERT INTO author(author_name)  VALUES ('Marco Almeida');
INSERT INTO author(author_name) VALUES ('Maria Tereza');
INSERT INTO author(author_name)  VALUES ('Clara Beatriz');

SELECT author.id, author.author_name as author FROM author ORDER BY author.id;
