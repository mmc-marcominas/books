# MVP-03: POST upload authors endpoint

Deliveries:

 * a POST endpoint that bulk insert author sent in a csv vile
 * upload tests

## Applied principles

 * DRY & KISS
   * use make approach to test endpoint
   * data access based on fastify plugins
 * MVP
   * deliver a POST endpoint to authors bulk insertion
   * deliver a Makefile with bulk insertion authors tests

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

### Test PUT author

To test authors bulk insertion feature, try:

``` bash
$ make upload-author file="./docs/authors.csv"
```

As result is expected something like this:

``` json
{
  "message": "Authors uploaded successfully"
}
```

Or this if invalid content file:

``` json
{
  "message": "Error uploading author"
}
```

You can check this doing `make upload-author file="./docs/fastify.md"` because first line of csv must be equals 'author' file header.

An empty file results in this error too.
