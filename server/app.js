const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const PORT = 3000;
const router = require('./routes.js');
// require('newrelic');

// USE middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

// Serves page with product id
app.use('/:id', express.static(path.join(__dirname + '/../client/dist')));

// Routes
app.use('/', router);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
