const cassandra = require('cassandra-driver');
const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1'
});

client.connect()
  .then(() => {
    const query = "CREATE KEYSPACE IF NOT EXISTS amazon WITH replication =" +
      "{'class': 'SimpleStrategy', 'replication_factor': '1' }";
    return client.execute(query);
  })
  .then(() => {
    const query = "CREATE TABLE IF NOT EXISTS amazon.qna" +
      " (id1 uuid, id2 timeuuid, txt text, val int, PRIMARY KEY(id1, id2))";
    return client.execute(query);
  })
  .catch((err) => {
    console.error('There was an error', err);
    return client.shutdown().then(() => { throw err; });
  });