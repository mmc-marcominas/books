# MVP-02: PUT and DELETE authors endpoints

Deliveries:

 * a PUT endpoint that update an author
 * a DELETE endpoint that delete an author
 * database plugin with update and delete operations

## Applied principles

 * DRY & KISS
   * use make approach to test endpoint
   * data access based on fastify plugins
 * MVP
   * deliver a PUT endpoint that update an author
   * deliver a DELETE endpoint that delete an author
   * deliver a Makefile with updating and deleting authors tests

## Implementation details

Database access is implemented by this [database plugin](../../src/plugins/database.js) with:

 * a `update` method to be used on documents updates.
 * a `deleteOne` method to be used on documents deletion.

## Run tests

Tests is on Makefile and use [curl](https://curl.se/) and [jq](https://jqlang.github.io/jq/) to do the job - `curl` send request and `jq` process result giving a pretty JSON output. Try install `jq` if following error occour on test execution:

``` bash
$ make get-authors
/bin/sh: 4: jq: not found
make: *** [Makefile:5: get-authors] Error 127
```

### Test PUT author

To test put author feature, try:

``` bash
$ make put-author author="Author name changed" id=64c27df7380985b4e7003665
```

As result is expected something like this:

``` json
{
  "id": "64c27df7380985b4e7003665",
  "message": "Author updated successfully"
}
```

Or this if author not found:

``` json
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "Author not found: 64c27df7380985b4e7003665"
}
```

### Test DELETE authors

To test authors deleting, try:

``` bash
$ make delete-author id=64c27df7380985b4e7003665
```

As result is expected something like this:

``` json
$ make delete-author id=64c27df7380985b4e7003665
{
  "id": "64c27df7380985b4e7003665",
  "message": "Author deleted successfully"
}
```

Not found error may occour in deletion operation too.
