const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// @route   GET api/games
// @desc    Get all games
router.get('/', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;