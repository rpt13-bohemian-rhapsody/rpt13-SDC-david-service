const faker = require('faker');

module.exports.questions = (count, iter) => {
  const questions = [];

  for (let i = 1; i <= count; i++) {
    questions.push({
      id: i + (count * iter),
      question: `${faker.lorem.sentence().slice(0, -1)}?`,
      product_id: Math.floor(Math.random() * 20000)
    });
  }

  return questions;
};

module.exports.responses = (count, iter) => {
  const responses = [];

  for (let i = 0; i < count; i++) {
    responses.push({
      id: i * iterations,
      question_id: i,
      create_date: faker.date.past(),
      votes: Math.floor(Math.random() * 2000),
      response: faker.lorem.paragraph(),
    });
  }

  return responses;
};