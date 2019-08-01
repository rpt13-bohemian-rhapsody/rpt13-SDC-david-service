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
      ORDER BY votes DESC
      LIMIT 10;
    `
    query(q, (data) => {
      res.status(200).send(data.rows);
    })
  },

  post: () => {
    query(`
      INSERT INTO questions (id, question, response, votes, product_id)
      VALUES (10000003, 'Test', 'Test', 200, 300);
    `)
  },

  put: (req, res) => {
    const q = `
      UPDATE questions
      SET votes = ${parseInt(req.body.vote)}
      WHERE id = ${req.params.question_id}
    `
    query(q, (data) => {
      res.status(200).send(data.rows);
    })
  },

  delete: () => {
    query(`
      DELETE FROM questions
      WHERE id = 900003
    `)
  }
};

module.exports.queries = queries;