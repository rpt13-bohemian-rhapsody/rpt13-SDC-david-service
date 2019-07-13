const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const app = express();
const db = require('../server/database/schema.js');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

// USE middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

// SERVER static files
app.use(express.static(path.join(__dirname + '/../client/dist')));

//allows to serve react files whenever the url Route is changed in the client side.
app.use('/products/:id', express.static(path.join(__dirname + '/../client/dist')));

// creates question
app.post('/products/questions/:productId');

// read/get all questions for specific product
app.get('/products/questions/:productId', db.getProductQuestions);

// update votes on a question
app.put('/products/questions/votes/:question_id', db.updateQuestionVote)

// deletes question
app.delete('/products/questions/:productId');

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
