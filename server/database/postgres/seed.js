const db = require('./index.js');

const seed = (() => {
  console.time("dbsave");
  const query = `
    COPY questions (id, question, response, votes, product_id)
    FROM '/Users/davidnguyen/RPT13/rpt13-SDC-david-service/server/database/seeding/fakerData.csv'
    DELIMITER ',';
  `;


  db.query(query, null, (err, data) => {
    if (err) {
      console.log(err);
    }

    console.timeEnd("dbsave");
    console.log(`Affected rows: 10,000,000`);
  });
})();