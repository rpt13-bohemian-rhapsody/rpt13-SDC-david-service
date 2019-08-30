const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const app = express();
const db = require('../server/database/schema.js');
const db2 = require('./database/postgres/controllers/index.js');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
// require('newrelic');

// USE middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

// SERVER static files
app.use(express.static(path.join(__dirname + '/../client/dist')));

//allows to serve react files whenever the url Route is changed in the client side.
app.use('/products/:id', express.static(path.join(__dirname + '/../client/dist')));

// creates product
app.post('/products/questions/', db.createProduct);

// read/get all questions for specific product
app.get('/products/questions/:productId/', db2.queries.get);

// update votes on a question
app.put('/products/questions/votes/:question_id', db2.queries.put);

// deletes product
app.delete('/products/questions/:productId', db.deleteProduct);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
