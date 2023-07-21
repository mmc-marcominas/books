# Books using a Node Express template project

This project is based on a GitLab [Project Template](https://gitlab.com/gitlab-org/project-templates/express).

The main idea is use some principles:

 * DRY - Don´t Reivent the Well
 * KISS - Keep It Simple Sir :)
 * MVP - Minimum Viable Product

This project aims to deliver an API with books and it's authors endpoints able to:

 * list authors and books
 * post individual author and a bulk insert by upload authors file
 * post individual book

## MVP Deliveries

Let's stat with some minumum viable products.

### MVP-01: GET authors endpoint

Deliveries:

 * a basic implementation that expose an author route
 * a GET endpoint that returns an author list ordered by id
 * a database in sqlite3 to store author records
 * steps documentation to do it from scratch

Delivery details are in [this MVP-01.md](./docs/MVP-01.md) file.

### MVP-02: GET books endpoint

Deliveries:

 * a basic implementation that expose an book route
 * a GET endpoint that returns an book list ordered by id
 * a database in sqlite3 to store book records and author relation
 * filter items by book name, edition, publication year and author
 * avoid duplicated inserts

Delivery details are in [this MVP-02.md](./docs/MVP-02.md) file.

### MVP-03: authors upload

Deliveries:

 * a POST endpoint that insert books according list uploaded in a file
 * fix tests on GET books endpoint

Delivery details are in [this MVP-03.md](./docs/MVP-03.md) file.

### MVP-04: Other authors and books endpoints

Deliveries:

 * a POST endpoint that insert author
 * avoid duplication author insertion
 * fix error rendering
 * fix typo in docs

Delivery details are in [this MVP-04.md](./docs/MVP-04.md) file.
