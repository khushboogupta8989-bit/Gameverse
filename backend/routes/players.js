const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// @route   GET api/players
// @desc    Get all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find().sort({ score: -1 }); // Sort by score
    res.json(players);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;