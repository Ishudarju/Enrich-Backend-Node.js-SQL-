const express = require('express');
const router = express.Router();
const {
  createNewsLetter,
  getNewsLetters,
  getNewsLetterById,
  updateNewsLetter,
  deleteNewsLetter
} = require('../Controller/newsletter_controller');

// Create a new newsletter
router.post('/newsletter', createNewsLetter);

// Get all newsletters
router.get('/getnewsletter', getNewsLetters);

// Get a newsletter by ID
router.get('/newsletters/:id', getNewsLetterById);

// Update a newsletter by ID
router.put('/newsletters/:id', updateNewsLetter);

// Delete a newsletter by ID
router.delete('/newsletters/:id', deleteNewsLetter);

module.exports = router;
