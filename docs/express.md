# Books using a Node Express template project

This solution intends to be a implementation to a simple REST API offering books and authors endpoints.

This project is based on a GitLab [Project Template](https://gitlab.com/gitlab-org/project-templates/express).

The main idea is use some principles:

 * DRY - Don't Reinvent the Wheel
 * KISS - Keep It Simple Sir :)
 * MVP - Minimum Viable Product

This project aims to deliver an API with books and it's authors endpoints able to:

 * list authors and books
 * post individual author and a bulk insert via upload authors file
 * post book individually

## Installing, testing and running

### Install

Change to your project directory and clone this repo.

``` bash
$ cd ~/your/projects/direcotory
$ git clone https://github.com/mmc-marcominas/books
```

Go to created books directory, checkout `feature/express` branch and install dependencies.

``` bash
$ cd ~/your/projects/direcotory/books/
$ git checkout feature/express
$ npm i
```

### Run tests

``` bash
$ cd ~/your/projects/direcotory/books/
$ npm run test
```

or with coverage report

``` bash
$ cd ~/your/projects/direcotory/books/
$ npm run test:coverage
```

### Run project

``` bash
$ cd ~/your/projects/direcotory/books/
$ npm run start
```

## MVP Deliveries history

Let's stat with some minimum viable products. I'll intentionally won't thinking on each best architectural choice to evidence what some simple decision impacts on project quality and maintenance.

Examples of `bad` decisions until now:

 * use of sqlite persistence - it's not for production porpouse but allow focus on what is important in a implementation using tables, relations and query issues that may be applyed basically in all other more maintainable and scalable solutions.
 * don't mind about dependency at beginning - this shows impacts doing unit tests and some refactoring effort to solve it had to be applied.
 * lack of logs - to understand what's going on behind the scenes, you should debug in some cases because some behavior occurs due to data sent from some resource, for example, adding a book with an empty author name in the author list.

Other decisions definitely have a better architectural alternative but I don't really consider a `bad` decision. Use KISS approach motivated them like:

 * use Postman to test instead of start with a TDD approach evidences that Postman may be more than a `GET`, `POST`, `PUT`, `PATCH`, `DELETE` tool, for example.
 * use a `Vanilla JavaScript approach` instead of implements `Typescript` that impacts on better definition of project models, for example. But it allows focus on strictly necessary on JavaScript environment and will be another requirement to implementation understanding if applied.

### MVP-01: GET authors endpoint

Deliveries:

 * a basic implementation that expose an author route
 * a GET endpoint that returns an author list order by id
 * a database in sqlite3 to store author records
 * steps documentation to do it from scratch

Delivery details are in [this MVP-01.md](./express/MVP-01.md) doc.

### MVP-02: GET books endpoint

Deliveries:

 * a basic implementation that expose an book route
 * a GET endpoint that returns an book list ordered by id
 * a database in sqlite3 to store book records and author relation
 * filter items by book name, edition, publication year and author
 * avoid duplicated inserts

Delivery details are in this [MVP-02.md](./express/MVP-02.md) doc.

### MVP-03: authors upload

Deliveries:

 * a POST endpoint that insert books according list uploaded in a file
 * fix tests on GET books endpoint

Delivery details are in this [MVP-03.md](./express/MVP-03.md) doc.

### MVP-04: Other authors and books endpoints

Deliveries:

 * a POST endpoint that insert author
 * avoid duplication author insertion
 * fix error rendering
 * fix typo in docs

Delivery details are in this [MVP-04.md](./express/MVP-04.md) doc.

### MVP-05: POST book endpoint

Deliveries:

 * a POST endpoint that insert book
 * implement transaction on database operations
 * implement author insertion if not exists features
 * fix typo in docs

Delivery details are in this [MVP-05.md](./express/MVP-05.md) doc.

### MVP-06: PUT book endpoint

Deliveries:

 * a PUT endpoint that update book
 * implement transaction on database operations

Delivery details are in this [MVP-06.md](./express/MVP-06.md) doc.

### MVP-07: DELETE book endpoint

Deliveries:

 * a DELETE endpoint that remove book
 * test success and failure on Postman

Delivery details are in this [MVP-07.md](./express/MVP-07.md) doc.

### MVP-08: Other authors and books endpoints

Deliveries:

 * fix typos in docs
 * add upload authors and post author Postman tests
 * change upload response to JSON
 * refactor insert author method

### MVP-09: Tests with Jest

Deliveries:

 * create tests to author services
 * create tests to book services
 * configure jest in project
 * configure code coverage

Delivery details are in this [MVP-09.md](./express/MVP-09.md) doc.
