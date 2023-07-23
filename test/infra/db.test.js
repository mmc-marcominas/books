const db = require('../../infra/db.js')
const { describe, it, expect } = require('@jest/globals')

describe('Database infra', () => {

  it('Should return false if no transaction', async () => {
    expect(db.transaction.inTransaction).toBe(false);
  })

  it('Should commit if transaction exists', async () => {
    db.transaction.begin();
    expect(db.transaction.inTransaction).toBe(true);

    if (db.transaction.inTransaction) {
      db.transaction.commit();
      expect(db.transaction.inTransaction).toBe(false);
    }
  })

  it('Should rollback if transaction exists', async () => {
    db.transaction.begin();
    expect(db.transaction.inTransaction).toBe(true);
    
    if (db.transaction.inTransaction) {
      db.transaction.rollback();
      expect(db.transaction.inTransaction).toBe(false);
    }
  })
})
