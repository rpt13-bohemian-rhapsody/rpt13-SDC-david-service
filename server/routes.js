const controller = require('./database/postgres/controllers');
const router = require('express').Router();

// Retrieve all questions for product
router.get('/questions/:productId', controller.question.get);

// Update votes on question
router.put('/questions/:question_id', controller.question.put);

// Create new question
router.post('/questions', controller.question.post);

// Deletes question
router.post('/questions', controller.question.delete)

module.exports = router;