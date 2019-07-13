const mongoose = require("mongoose");

// working with env variables
require('dotenv').config()

// mongoose.connect(process.env.MONGOURI, {
//   useNewUrlParser: true
// });


mongoose.connect('mongodb://localhost:27017/QuestionAndAnswers'
  , {
  useNewUrlParser: true
});

const Schema = mongoose.Schema;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("connected to mongoDB"));

const questionNAnswersSchema = mongoose.Schema({
  product: Number,
  questions: [
    {
      question_id: Number,
      question: String,
      answers: [
        {
          user: String,
          answer: String,
          createdAt: Date
        }
      ],
      votes: Number
    }
  ]
});

// to use schema, it must be converted to a Model
const questions = mongoose.model("questions", questionNAnswersSchema);

const getProductQuestions = (req, res) => {
  questions.find({ product: req.params.productId }).exec((err, data) => {
    if (err) {
      console.log(err);
    }

    data[0].questions.sort((a, b) => {
      return b.votes - a.votes;
    });

    res.send(data[0]);
  });
};

const updateQuestionVote = (req, res) => {
  const _id = req.body.product;
  const vote = req.body.vote;
  const question_id = req.params.question_id;

  // find productID
  questions.findById(_id, (err, doc) => {
    if (err) {
      console.log(err);
    }
    doc.questions.forEach(question => {
      if (question.question_id === Number(question_id)) {
        question.votes = question.votes + Number(vote);
        doc.save();
        res.send(question);
      }
    });
  });
};

module.exports = {
  db,
  questions,
  getProductQuestions,
  updateQuestionVote
};
