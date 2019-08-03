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
    });
  },

  post: (req, res) => {
    const q = `
      INSERT INTO questions (id, question, response, username, createdat, votes, product_id)
      VALUES (${req.params.question_id}, ${req.params.question}, ${req.params.response}, ${req.params.username}, ${req.params.createdat}, ${parseInt(req.body.vote)}, ${req.params.productId});
    `
    query(q, (data) => {
      res.status(200).send(data.rows);
    });
  },

  put: (req, res) => {
    const q = `
      UPDATE questions
      SET votes = ${parseInt(req.body.vote)}
      WHERE id = ${req.params.question_id}
    `
    query(q, (data) => {
      res.status(200).send(data.rows);
    });
  },

  delete: (req, res) => {
    const q = `
      DELETE FROM questions
      WHERE id = ${req.params.question_id}
    `
    query(q, (data) => {
      res.status(200).send(data.rows);
    });
  }
};

module.exports.queries = queries;