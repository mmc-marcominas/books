const db = require('../infra/db');

function list() {
  const query = `SELECT author.id, author.author_name as author FROM author ORDER BY author.id`
  const data = db.query(query);

  return {
    data
  }
}

module.exports = {
  list
}
