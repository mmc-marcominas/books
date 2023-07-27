# MVP-05: PUT and DELETE book endpoints

Deliveries:

 * a PUT endpoint that update an book
 * a DELETE endpoint that delete an book
 * book update and delete tests

## Applied principles

 * DRY & KISS

   * use make approach to test endpoint
   * data access based on fastify plugins

 * MVP

   * deliver a PUT endpoint that update an book
   * deliver a DELETE endpoint that delete an book
   * deliver a Makefile with tests updating and deleting books

## Implementation details

 * a [handler](../../src/lib/handlers/book/update.js) with updating rules.
 * a [handler](../../src/lib/handlers/book/delete.js) with deletion rules.

## Run tests

Tests is on Makefile and use [curl](https://curl.se/) and [jq](https://jqlang.github.io/jq/) to do the job - `curl` send request and `jq` process result giving a pretty JSON output. Try install `jq` if following error occour on test execution:

``` bash
$ make get-authors
/bin/sh: 4: jq: not found
make: *** [Makefile:5: get-authors] Error 127
```

### Test PUT book

To test updating book feature, try:

``` bash
$ make put-book
```

As result is expected something like this:

``` json
{
  "id": "64c27df7380985b4e7003665",
  "message": "Book updated successfully"
}
```

### Test DELETE books

To test books retrieving, try:

``` bash
$ make delete-book id=64c2d7ddade8faaff309850d
```

As result is expected something like this:

``` json
{
  "id": "64c27df7380985b4e7003665",
  "message": "Book deleted successfully"
}
```
