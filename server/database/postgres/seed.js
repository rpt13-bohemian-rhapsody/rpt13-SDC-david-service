const db = require('./index.js');
const faker = require('faker');

const seed = () => {
  for (let i = 0; i < 1000000; i++) {
    db.query(`INSERT INTO questions (id, question, product_id) VALUES(${question})`);
    const question = faker.lorem.sentence();
    const response = faker.lorem.paragraph();
  }
}

seed();