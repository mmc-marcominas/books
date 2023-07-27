# Books using a fastify implementation

This solution intends to be a implementation to a simple REST API offering authors and books endpoints.

This project aims to deliver an API with books and it's authors endpoints able to:

 * post, put and delete individual author
 * post and delete individual book
 * bulk insert authors via upload file
 * list authors
 * list books

## Installing, testing and running

### Install

Change to your project directory and clone this repo.

``` bash
$ cd ~/your/projects/direcotory
$ git clone https://github.com/mmc-marcominas/books
```

Go to created books directory, checkout `feature/fastify` branch and install dependencies.

``` bash
$ cd ~/your/projects/direcotory/books/
$ git checkout feature/fastify
$ make clean
$ make start
$ make restart
```

Use `make clean` to remove `node_modules` directory and install app dependencies.

At first start use `make start` - it will start docker instance and app. Next times try `make restart` - it will stop docker instance, start again and run app.

Check test functionalities reading available test on [Makefile](../Makefile).

## MVP Deliveries history

Let's start with some minimum viable products. I'll intentionally won't thinking on each best architectural choice to evidence what some simple decision impacts on project quality and maintenance.

### MVP-01: Authors GET and POST endpoints

Deliveries:

 * a POST endpoint that insert an author
 * a GET endpoint that returns an author list
 * a database plugin to use MongoDB as persistence
 * steps documentation to do it from scratch

Delivery details are in [this MVP-01.md](./fastify/MVP-01.md) doc.

# MVP-02: PUT and DELETE authors endpoints

Deliveries:

 * a PUT endpoint that update an author
 * a DELETE endpoint that delete an author
 * database plugin with update and delete operations

Delivery details are in [this MVP-02.md](./fastify/MVP-02.md) doc.

# MVP-03: POST upload authors endpoint

Deliveries:

 * a POST endpoint that bulk insert author sent in a csv vile
 * upload tests

Delivery details are in [this MVP-03.md](./fastify/MVP-03.md) doc.
