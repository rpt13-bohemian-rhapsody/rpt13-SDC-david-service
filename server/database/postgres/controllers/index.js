const db = require('../index.js');

const query = (query, cb) => {
  db.query(query, null, (err, data) => {
    if (err) {
      console.log(err);
    }
    cb(data);
  });
};

const queries = {
  get: (req, res) => {
    const q = `
      SELECT *
      FROM questions
      WHERE product_id = ${req.params.productId}
      ORDER BY votes DESC;
    `
    query(q, (data) => {
      res.send(data.rows);
    })
  },

  post: () => {
    query(`
      INSERT INTO questions (id, question, response, votes, product_id)
      VALUES (10000003, 'Test', 'Test', 200, 300);
    `)
  },

  put: () => {
    query(`
      UPDATE questions
      SET votes = 200
      WHERE id = 901000;
    `)
  },

  delete: () => {
    query(`
      DELETE FROM questions
      WHERE id = 900003
    `)
  }
};

module.exports.queries = queries;