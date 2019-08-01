const database = 'amazon';
const { Pool } = require('pg');
const pool = new Pool({ database });

pool.on('connect', () => {
  console.log('connected to the db');
});

const createTables = () => {
  const createQuestions =
  `CREATE TABLE IF NOT EXISTS
    questions(
      id INT PRIMARY KEY,
      question TEXT NOT NULL,
      response TEXT NOT NULL,
      username TEXT NOT NULL,
      createdat TIMESTAMPTZ NOT NULL,
      votes INT NOT NULL,
      product_id INT NOT NULL
    )`;
  pool.query(createQuestions)
    .then((res) => {
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const query = (text, params, callback) => {
  return new Pool({ database }).query(text, params, callback);
};

createTables();

module.exports = {
  createTables,
  query
};