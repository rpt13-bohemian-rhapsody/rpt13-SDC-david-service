const faker = require('faker');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const tick = () => new Promise(res => setTimeout(res, 0));

const questions = (count, iter, cb) => {
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

  cb(questions);
};

(async () => {
  for(let i = 0; i < 100; i++) {
    questions(100000, i, (data) => {
      fs.appendFileSync(`${__dirname}/fakerData.js`, JSON.stringify(data, null, '\t'))
    })
    await tick();
  }
})();