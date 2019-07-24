const faker = require('faker');

module.exports.questions = (count, iter) => {
  const questions = [];

  for (let i = 1; i <= count; i++) {
    questions.push({
      id: i + (count * iter),
      question: `${faker.lorem.sentence().slice(0, -1)}?`,
      response: faker.lorem.paragraph(),
      votes: Math.floor(Math.random() * 1000),
      product_id: Math.floor(Math.random() * 20000)
    });
  }

  return questions;
};