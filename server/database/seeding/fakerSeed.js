const faker = require('faker');
const fs = require('fs');
const json2csv = require('json2csv').parse;

const questions = (count, iter, cb) => {
  let questions = '';

  for (let i = 1; i <= count; i++) {
    questions += `${i + (count * iter)}, ${faker.lorem.sentence().slice(0, -1)}?, ${faker.lorem.paragraph()}, ${Math.floor(Math.random() * 1000)}, ${Math.floor(Math.random() * 20000)}\n`;
  }

  cb(questions);
};

const seed = (() => {
  for(let i = 0; i < 50000; i++) {
    questions(2, i, (data) => {
      fs.appendFileSync(`${__dirname}/fakerData.csv`, data)
    })
  }
})();