const sqlite = require('better-sqlite3');
const path = require('path');
const db = new sqlite(path.resolve('database/books.db'), { fileMustExist: true });

function query(sql) {
  return db.prepare(sql).all();
}

function run(sql, params) {
  return db.prepare(sql).run(params);
}

const transaction = {
  begin() {
    db.prepare('BEGIN').run();
  },
  commit() {
    db.prepare('COMMIT').run();
  },
  rollback() {
    if (this.inTransaction) {
      db.prepare('ROLLBACK').run();
    }
  },
  get inTransaction() {
    return db.inTransaction
  }
}

module.exports = {
  transaction,
  query,
  run
}
