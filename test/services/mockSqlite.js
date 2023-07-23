class MockSqlite {

  static async testQuery(db, result, test) {
    const instance = db.query.bind({});

    db.query = (sql) => {
      return result;
    }

    await test()
    db.query = instance;
  }

  static async testRun(db, test) {
    const instance = db.run.bind({});

    db.run = (sql, params) => {
      return {
        "changes": 1,
        "lastInsertRowid": 50
      };
    }
    
    await test()
    db.run = instance;
  }

}

module.exports = MockSqlite
