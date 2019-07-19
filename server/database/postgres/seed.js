const db = require('./index.js');
// const pg = require('pg');
// require('pg-essential').patch(pg);
const faker = require('../seeding/fakerSeed.js');

var start = new Date()
const query = `
  INSERT INTO questions (
    SELECT
      (data->>'id')::int, (data->>'question')::text, (data->>'product_id')::int
    FROM (
      SELECT json_array_elements($1::json) AS data
    ) tmp
  )
`
const params = JSON.stringify(faker.seed().questions)
db.query(query, [params], (err, res) => {
  if (err) {
    console.log(err);
  }
  var end = new Date() - start
  console.info('Execution time: %dms', end);
});


// const seed = () => {
//   return pg().then((p) => {
//     return p.getClient().then((connection) => {
//         bulkData = faker.seed().questions;
//         const columns = ['id', 'question', 'product_id'];
//         connection.client.executeBulkInsertion(bulkData, columns, 'questions');
//         connection.done();
//         });
//   });
// }

// seed();