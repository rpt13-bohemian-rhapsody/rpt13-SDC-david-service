const db = require('./index.js');
const faker = require('../seeding/fakerSeed.js');

const seed = (iter) => {
  const query = `
    INSERT INTO questions (
      SELECT
        (seed->>'id')::int, (seed->>'question')::text, (seed->>'response')::text, (seed->>'votes')::int, (seed->>'product_id')::int
      FROM (
        SELECT json_array_elements($1::json) AS seed
      ) tmp
    )
  `;

  const nextSeed = (i, endIterAt) =>  (err, res) => {
    if (err) {
      console.log(err);
    }
    if (i < endIterAt) {
      seed(i + 1);
    } else {
      console.timeEnd("dbsave")
    }
    console.log(`Complete iteration ${i}`)
  };

  db.query(query, [JSON.stringify(faker.questions(100000, iter))], nextSeed(iter, 100));
};

console.time("dbsave");
seed(0);