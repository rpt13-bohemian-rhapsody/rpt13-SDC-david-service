const faker = require('faker');
const fs = require('fs');

const questions = (count, iter, cb) => {
  let questions = '';

  for (let i = 1; i <= count; i++) {
    questions += `${i + (count * iter)}, ${faker.lorem.sentence().slice(0, -1)}?, ${faker.lorem.paragraph()}, ${faker.name.firstName()}, ${faker.date.recent(200).toJSON()}, ${Math.floor(Math.random() * 1000)}, ${Math.floor(Math.random() * 20000)}\n`;
  }

  cb(questions);
};

const seed = (() => {
  for(let i = 0; i < 50000; i++) {
    questions(200, i, (data) => {
      fs.appendFileSync(`${__dirname}/fakerData.csv`, data)
    })
  }
})();