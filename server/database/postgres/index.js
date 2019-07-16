const database = 'amazon';
const { Pool } = require('pg');
const pool = new Pool({ database: 'template1' });

pool.on('connect', () => {
  console.log('connected to the db');
});

const createDatabase = () => {
  pool.query(`SELECT 1 FROM pg_database WHERE datname = '${database}'`)
  .then((res) => {
    if (res.rowCount === 0) {
      pool.query(`CREATE DATABASE ${database}`)
      .then(() => {
        createTables();
      });
    }
  })
}

const createTables = () => {
  const createQuestions =
  `CREATE TABLE IF NOT EXISTS
    questions(
      id INT PRIMARY KEY,
      question TEXT NOT NULL,
      product_id INT NOT NULL
    )`;
  pool.query(createQuestions)
  .then(() => {
    const createResponses =
    `CREATE TABLE IF NOT EXISTS
      responses(
        id INT PRIMARY KEY,
        question_id INT NOT NULL,
        create_date TIMESTAMP NOT NULL,
        votes INT NOT NULL,
        response TEXT NOT NULL
      )`;
    pool.query(createResponses)
    .then((res) => {
      pool.end();
    })
  })
  .catch((err) => {
    console.log(err);
    pool.end();
  });
};

const query = (text, params, callback) => {
  return pool.query(text, params, callback);
};

createDatabase();

module.exports = {
  createDatabase,
  createTables,
  query
};