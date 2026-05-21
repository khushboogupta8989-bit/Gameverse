const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament');

// @route   GET api/tournaments
// @desc    Get all tournaments
router.get('/', async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.json(tournaments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;