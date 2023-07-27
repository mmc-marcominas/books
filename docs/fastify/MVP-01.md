# MVP-01: GET authors endpoint

Deliveries:

 * a POST endpoint that insert an author
 * a GET endpoint that returns an author list
 * a database plugin to use MongoDB as persistence
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

## Implementatio details

Database access is implemented by thius [database plung](../../src/plugins/database.js) with:

 * a `validateCollectionNames` method to force use of `collections` enum to set name of colletion to be used by database instance.
 * a `exists` method to be used on creation and avoid duplication insertion since name is the only value on document for now.
 * a `create` nethod to be used on document creation.
 * a `read` nethod to be used on documents retrieving.
 * a `parseAuthor` to standardize author model.

Validate collection name of an instance is very important because on plugin declaration name must be specified hardcoded, example:

``` javascript
function authorPlugin(app, opts, next) {
  app.register(require('fastify-mongodb'), opts.mongo)
  app.register(require('./database'), { collectionName: 'authors' })

  ...

  next()
}
```

Thinking on maintenabilty, [handlers](../../src/lib/handlers/author/) and [schemas](../../src/lib/schemas/author/) where implemented in separated files.

``` bash
── src
   ├── app.js
   ├── lib
   │   ├── handlers
   │   │   └── author
   │   │       ├── create.js
   │   │       ├── index.js
   │   │       └── read.js
   │   └── schemas
   │       ├── author
   │       │   ├── author.js
   │       │   ├── index.js
   │       │   └── list.js
   │       └── common.js
```

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
