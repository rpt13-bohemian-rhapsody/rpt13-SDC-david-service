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

// SERVER static files
app.use(express.static(path.join(__dirname + '/../client/dist')));



//allows to serve react files whenever the url Route is changed in the client side.
app.use('/products/:id', express.static(path.join(__dirname + '/../client/dist')));

// Routes
app.use('/', router);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
