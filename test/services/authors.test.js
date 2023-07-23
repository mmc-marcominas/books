const service = require('../../services/authors.js')
const mockSqlite = require('./mockSqlite.js')
const db = require('../../infra/db');

const authors = new service(db);

let { describe, it, expect } = require('@jest/globals')

describe('Author service', () => {

  const tryUploadAuthor = async (file) => {
    try { return await authors.upload(file); }
    catch (err) { return err.message; }
  }
  const tryInsertAuthor = async (author) => {
    try { return await authors.insert(author); }
    catch (err) { return err.message; }
  }

  it('Should return a authors list', async () => {
    const items = [
      { "id": 1, "author": "Marco Almeida" },
      { "id": 2, "author": "Maria Tereza" },
      { "id": 3, "author": "Clara Beatriz" }
    ];
    const test = async () => {
      const result = await authors.list();
      expect(result.data.length).toBeGreaterThan(0);
    }
    mockSqlite.testQuery(db, items, test);
  })

  it('Should upload a author file', async () => {
    const authorList = [
      'author\r',
      'Luciano Ramalho\r',
      'Osvaldo Santana Neto\r',
      'David Beazley\r',
      'Chetan Giridhar\r',
      'Brian K. Jones\r',
      'J.K Rowling\r',
    ];

    const test = async () => {
      const result = await authors.upload(authorList);
      expect(result).toEqual({ "message": { "message": "Author created successfully" } });
    }
    mockSqlite.testRun(db, test);
  })

  it('Should upload a author file throw error', async () => {
    const authorList = ['author\r', null];
    const result = await tryUploadAuthor(authorList);
    expect(result).toEqual('Missing author name');
  })

  it('Should upload a author file throw error', async () => {
    const result = await tryUploadAuthor(null);
    expect(result).toEqual('No authors was provided');
  })

  it('Should upload a author file without header throw error', async () => {
    const result = await tryUploadAuthor(['']);
    expect(result).toEqual('File without author header');
  })

  it('Should insert a author', async () => {
    const test = async () => {
      const result = await authors.insert('Author test');
      expect(result).toEqual({ "message": 'Author created successfully' });
    }
    mockSqlite.testRun(db, test);
  })

  it('Should insert a author throw error', async () => {
    const result = await tryInsertAuthor(null);
    expect(result).toEqual('Missing author name');
  })

  it('Should insert a author throw error', async () => {
    const result = await tryInsertAuthor({});
    expect(result).toEqual('Error creating author');
  })
})
