const { describe, it, expect } = require('@jest/globals')
const { faker } = require('@faker-js/faker')

const BookService = require('../../services/books.js')
const mockSqlite = require('./mockSqlite.js')
const db = require('../../infra/db.js')
const books = new BookService(db)

describe('Book services', () => {
    const allBooks = () => {
        return [
            { "id": 1, "book": "Desafio Backend com Node.js e SQLite", "edition": 1, "year": 2022, "author": "Marco Almeida" },
            { "id": 1, "book": "Desafio Backend com Node.js e SQLite", "edition": 1, "year": 2022, "author": "Maria Tereza" },
            { "id": 2, "book": "Desafio Backend com Node.js e SQLite", "edition": 2, "year": 2023, "author": "Marco Almeida" },
            { "id": 2, "book": "Desafio Backend com Node.js e SQLite", "edition": 2, "year": 2023, "author": "Maria Tereza" },
            { "id": 2, "book": "Desafio Backend com Node.js e SQLite", "edition": 2, "year": 2023, "author": "Clara Beatriz" }
        ]
    }
    const dataSample = [
        {
            "id": 1,
            "book": "Desafio Backend com Node.js e SQLite",
            "edition": 1,
            "year": 2022,
            "authors": [
                "Marco Almeida",
                "Maria Tereza"
            ]
        },
        {
            "id": 2,
            "book": "Desafio Backend com Node.js e SQLite",
            "edition": 2,
            "year": 2023,
            "authors": [
                "Marco Almeida",
                "Maria Tereza",
                "Clara Beatriz"
            ]
        }
    ];
    const fakeBook = {
        "name": faker.internet.userName(),
        "edition": faker.number.int(),
        "year": faker.number.int({ min: 1967, max: 2023 }),
        "authors": [
            "Marco Almeida",
            "Clara Beatriz",
        ]
    }
    const tryInsertBook = async (book) => {
        try { return await books.insert(book) }
        catch (err) { return err.message; }
    }
    const tryDeleteBook = async (book) => {
        try { return await books.delete(book) }
        catch (err) { return err.message; }
    }

    it('Should return a list filtered by book name', async () => {
        const params = {
            book: 'Desafio'
        }
        const expectedResult = {
            "data": [...dataSample],
            "meta": {
                "book": "Desafio"
            }
        }
        const items = [...allBooks()];
        const test = async () => {
            const result = await books.list(params);
            expect(result).toEqual(expectedResult);
        }
        mockSqlite.testQuery(db, items, test);
    })

    it('Should return a list filtered by book edition', async () => {
        const params = {
            "edition": 1
        }
        const expectedResult = {
            "data": [...dataSample],
            "meta": params
        }
        expectedResult.data.pop();
        const items = [...allBooks().filter(b => b.edition === 1)]
        const test = async () => {
            const result = await books.list(params)
            expect(result).toEqual(expectedResult)
        }
        mockSqlite.testQuery(db, items, test);

    })

    it('Should return a list filtered by book year', async () => {
        const params = {
            year: 2022
        }
        const expectedResult = {
            "data": [...dataSample],
            "meta": params
        }
        const items = [...allBooks().filter(b => b.year === 2022)]
        expectedResult.data.pop();
        const test = async () => {
            const result = await books.list(params)
            expect(result).toEqual(expectedResult)
        }
        mockSqlite.testQuery(db, items, test);
    })

    it('Should return a list filtered by book author', async () => {
        const params = {
            author: "Marco Almeida"
        }
        const expectedResult = {
            "data": [...dataSample],
            "meta": params
        }
        const items = [...allBooks()];
        const test = async () => {
            const dataReturn = await books.list(params)
            expect(dataReturn).toEqual(expectedResult)
        }
        mockSqlite.testQuery(db, items, test);
    })

    it('Should return a list with all books', async () => {
        const params = {}
        const expectedResult = {
            "data": [...dataSample],
            "meta": params
        }
        const items = [...allBooks()];
        const test = async () => {
            const result = await books.list(params)
            expect(result).toEqual(expectedResult)
        }
        mockSqlite.testQuery(db, items, test);
    })

    it('Should insert a book', async () => {
        console.log = function () { };
        const book = { ...fakeBook };
        const expectedResult = { "message": "Book created successfully" }
        book.authors.push('Clara Carolina')
        const test = async () => {
            const dataReturn = books.insert(book)
            expect(dataReturn).toEqual(expectedResult)
        }
        mockSqlite.testRun(db, test);
    })

    it('Should update a book', async () => {
        console.log = function () { };
        const expectedResult = { "message": "Book updated successfully" }
        const update = {
            "name": faker.internet.userName(),
            "edition": faker.number.int(),
            "year": faker.number.int({ min: 1967, max: 2023 }),
            "authors": [
                "Marco Almeida",
                "Clara Beatriz"
            ]
        }
        const id = 2
        const test = async () => {
            const result = await books.update(id, update)
            expect(result).toEqual(expectedResult)
        }
        mockSqlite.testRun(db, test);

    })

    it('Should update a book throw error', async () => {
        console.log = function () { };
        const expectedResult = 'Error updating book'
        const book = { ...fakeBook }
        book.authors.push('')
        try { await books.update(2, book) }
        catch (err) { expect(err.message).toEqual(expectedResult) }
    })

    it('Should insert a book throw error', async () => {
        console.log = function () { };
        const expectedResult = 'Error creating book'
        const book = { ...fakeBook }
        book.authors.push(null)
        const result = await tryInsertBook(book)
        expect(result).toEqual(expectedResult)
    })

    it('Should insert a null book throw error', async () => {
        const expectedResult = 'No book is provided'
        const result = await tryInsertBook(null)
        expect(result).toEqual(expectedResult)
    })

    it('Should insert a book without name throw error', async () => {
        const expectedResult = 'Name is empty, Edition is empty, Publication year is empty, Authors is empty'
        const result = await tryInsertBook({})
        expect(result).toEqual(expectedResult)
    })

    it('Should insert a book without edition throw error', async () => {
        const expectedResult = 'Edition is empty, Publication year is empty, Authors is empty'
        const result = await tryInsertBook({ name: 'name' })
        expect(result).toEqual(expectedResult)
    })

    it('Should insert a book without publication year throw error', async () => {
        const expectedResult = 'Publication year is empty, Authors is empty'
        const result = await tryInsertBook({ name: 'name', edition: 1 })
        expect(result).toEqual(expectedResult)
    })

    it('Should insert a book without authors throw error', async () => {
        const expectedResult = 'Authors is empty'
        const result = await tryInsertBook({ name: 'name', edition: 1, year: 2023 })
        expect(result).toEqual(expectedResult)
    })

    it('Should delete a book', async () => {
        const expectedResult = { "message": "Book deleted successfully" }
        const test = async () => {
            const result = await books.delete(2)
            expect(result).toEqual(expectedResult)
        }
        mockSqlite.testRun(db, test);
    })

    it('Should delete a book throw error', async () => {
        const expectedResult = "Error on deleting book"
        const result = await tryDeleteBook(null)
        expect(result).toEqual(expectedResult)
    })
})
