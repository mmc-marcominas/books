# Books API

This project intends to be a implementation to a simple REST API solution offering books and authors endpoints.

A fastify implementation is provided on `feature/fastify` branch. For now, branches will be kept to history purpose.

Check this [readme](./docs/fastify.md) to install and use fastify implementation.

The main idea is use some principles:

 * DRY - Don't Reinvent the Wheel
 * KISS - Keep It Simple Sir :)
 * MVP - Minimum Viable Product

This project aims to deliver an API with books and it's authors endpoints able to:

 * post, put and delete individual author
 * post, put and delete individual book
 * bulk insert authors via upload file
 * list authors
 * list books
 