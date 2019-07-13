const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const app = express();
const db = require("../server/database/schema.js");
const cors = require('cors');
const PORT = process.env.PORT || 3000;

// USE middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

// SERVER static files
app.use(express.static(path.join(__dirname + "/../client/dist")));

//allows to serve react files whenever the url Route is changed in the client side.
app.use("/products/:id", express.static(path.join(__dirname + "/../client/dist")));

// gets all questions for specific productId
app.get("/products/questions/:productId", db.getProductQuestions);

// modifies the votes property of a question depending on the value
app.put("/products/votes/:question_id", db.updateQuestionVote)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
