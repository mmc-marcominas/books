# MVP-03: POST books endpoint

Deliveries:

 * a POST endpoint that insert books according list uploaded in a file
 * fix tests on GET books endpoint
 * improve formatting in docs

## Applied principles

 * DRY & KISS
   * use a simple data access [implementation](https://geshan.com.np/blog/2021/10/nodejs-sqlite/)
   * use Postman to test endpoint result
 * MVP
   * deliver a POST endpoint that insert authors sent in a file
     * first line must be a header
     * first line must have 'author' value
     * other lines must have author name
   * use unique indexes to avoid duplicated inserts
   * deliver a Postman request that tests retrieving authors data

## Postman request

### POST - upload authors

CSV file sample

``` text
author
Luciano Ramalho
Osvaldo Santana Neto
David Beazley
Chetan Giridhar
Brian K. Jones
J.K Rowling
```

curl:

``` bash
curl --location 'http://localhost:3000/authors/upload' \
--form 'file=@"./authors.csv"'
```

![Postman post upload authors](./images/mvp-03-post-upload.PNG "Postman post upload authors")

#### After authors insertion

curl:

``` bash
curl --location 'http://localhost:3000/authors'
```

![Postman get all authors](./images/mvp-03-get-all.PNG "Postman get all authors")

#### Postman tests

``` javascript
const result = pm.response.json();

pm.test("On success - it should return status code 200", () => {
    pm.expect(pm.response.code).to.equal(200);
});

pm.test("On success - it should return message on result", () => {
    pm.expect(result.message).to.exist;
});

pm.test("On success - it should return successfully message", () => {
    pm.expect(result.message).to.equal("Authors uploaded successfully");
});
```
