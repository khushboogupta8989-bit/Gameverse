const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const auth = require('../middleware/authmiddleware');

// @route   GET api/quiz/:level
// @desc    Get specific level questions
router.get('/:level', async (req, res) => {
  try {
    // Find quiz by level number (1, 2, 3...)
    const quiz = await Quiz.findOne({ level: req.params.level });
    if (!quiz) return res.status(404).json({ msg: 'Level not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST api/quiz/submit
// @desc    Submit quiz score (Optional, requires auth)
router.post('/submit', auth, async (req, res) => {
  try {
    // Logic to save score can be added here
    res.json({ msg: 'Score submitted successfully' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;