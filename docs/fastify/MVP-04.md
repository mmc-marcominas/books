# MVP-04: POST and GET book endpoints

Deliveries:

 * a POST endpoint that insert an book
 * a GET endpoint that returns an book list
 * book insert and read tests

## Applied principles

 * DRY & KISS
   * use make approach to test endpoint
   * data access based on fastify plugins
 * MVP
   * deliver a POST endpoint that insert an book
   * deliver a GET endpoint that returns book list
   * deliver a Makefile with tests saving and retrieving books

## Implementation details

Database access is implemented by this [database plugin](../../src/plugins/database.js) with:

 * handle file upload done by `@fastify/multipart` plugin.
 * a [handler](../../src/lib/handlers/author/upload.js) with business rule.
 * a [handler](../../src/lib/handlers/file.js) with file upload implementation.

## Run tests

Tests is on Makefile and use [curl](https://curl.se/) and [jq](https://jqlang.github.io/jq/) to do the job - `curl` send request and `jq` process result giving a pretty JSON output. Try install `jq` if following error occour on test execution:

``` bash
$ make get-authors
/bin/sh: 4: jq: not found
make: *** [Makefile:5: get-authors] Error 127
```

### Test POST book

To test post book feature, try:

``` bash
$ make post-book
```

As result is expected something like this:

``` json
{
  "message": "Book created successfully",
  "insertedAuthors": [
    "Marco Almeida",
    "Maria Tereza"
  ]
}
```

### Test GET books

To test books retrieving, try:

``` bash
$ make get-books
```

As result is expected something like this:

``` json
{
  "data": [
    {
      "id": "64c2d7ddade8faaff309850d",
      "book": "A família Dorta Almeida - Segunda Edição",
      "edition": 2,
      "year": 2023,
      "authors": [
        "Marco Almeida",
        "Maria Tereza"
      ]
    }
  ]
}
```
