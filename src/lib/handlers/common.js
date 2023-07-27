'use strict'

/** 
* Create an error object to be used when record is not found in database.
* @param {String} modelName - Model name.
* @param {String} id - Model id.
* @return {Object} Error with `${modelName} not found: ${id}` pattern and 404 status.
*/
function notFoundError(modelName, id) {
  const error = new Error(`${modelName} not found: ${id}`)
  error.status = 404
  return error
}

module.exports = {
  notFoundError
}