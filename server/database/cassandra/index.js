const cassandra = require('cassandra-driver');
const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1'
});

client.connect()
  .then(() => {
    const query = `CREATE KEYSPACE IF NOT EXISTS amazon WITH replication =
      {'class': 'SimpleStrategy', 'replication_factor': '1' }`;
    return client.execute(query);
  })
  .then(() => {
    const query = `CREATE TABLE IF NOT EXISTS amazon.qna
      (id int, question text, response text, votes int, product_id int, PRIMARY KEY(id))`;
    return client.execute(query);
  })
  .then(() => {
    console.log('Complete creating keyspace/table.')
  })
  .catch((err) => {
    console.error('There was an error', err);
    return client.shutdown().then(() => { throw err; });
  });