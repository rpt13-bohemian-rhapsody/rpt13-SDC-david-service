const db = require('./index.js');

const benchmarkQuery = (query, testName) => {
  console.time(testName);
  db.query(query)
    .then ((err, data) => {
      if (err) {
        console.log(err);
      }
      console.timeEnd(testName);
      console.log(`Completed ${testName}`);
    }
  );
};

const queries = {
  get: () => {
    benchmarkQuery(`
      SELECT *
      FROM amazon.qna
      WHERE id = 910000;
    `, `get request`
    )
  },

  post: () => {
    benchmarkQuery(`
      INSERT INTO amazon.qna (id, question, response, votes, product_id)
      VALUES (10000003, 'Test', 'Test', 200, 300);
    `, `post request`
    )
  },

  put: () => {
    benchmarkQuery(`
      UPDATE amazon.qna
      SET votes = 200
      WHERE id = 901000;
    `, `put request`
    )
  },

  delete: () => {
    benchmarkQuery(`
      DELETE FROM amazon.qna
      WHERE id = 900003
    `, `delete request`
    )
  }
};

queries.get();
queries.post();
queries.put();
queries.delete();