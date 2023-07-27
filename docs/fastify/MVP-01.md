# MVP-01: GET authors endpoint

Deliveries:

 * a basic implementation that expose an author route
 * a GET endpoint that returns an author list ordered by id
 * a database in sqlite3 to store author records
 * steps documentation to do it from scratch

## Applied principles

 * DRY & KISS
   * make projet from zero
   * use a simple data access implementation based on fastify plugins
   * use make approach to test endpoint
 * MVP
   * deliver a POST endpoint that insert an author
   * deliver a GET endpoint that returns author list
   * deliver a Makefile with tests saving and retrieving authors

## Run tests

Tests is on Makefile and use [curl](https://curl.se/) and [jq](https://jqlang.github.io/jq/) to do the job - `curl` send request and `jq` process result giving a pretty JSON output. Try install `jq` if following error occour on test execution:

``` bash
$ make get-authors
/bin/sh: 4: jq: not found
make: *** [Makefile:5: get-authors] Error 127
```

### Test POST author

To test post author feature, try:

``` bash
$ make post-author author="Molly & Nala Doggies"
```

As result is expected something like this:

``` json
{
  "id": "64c25c5728a2be7c885ec4f3",
  "message": "Author created successfully"
}
```

### Test GET authors

To test authors retrieving, try:

``` bash
$ make get-authors
```

As result is expected something like this:

``` json
{
  "data": [
    {
      "id": "64c255e0d3ef15dd96267856",
      "author": "Marco Almeida"
    },
    {
      "id": "64c255e0d3ef15dd96267857",
      "author": "Maria Tereza"
    },
    {
      "id": "64c255e0d3ef15dd96267858",
      "author": "Clara Beatriz"
    }
  ]
}
```
