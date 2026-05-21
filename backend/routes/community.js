const express = require('express');
const router = express.Router();
const Highlight = require('../models/Highlight');
const Discussion = require('../models/Discussion');
const CommunityEvent = require('../models/CommunityEvent');

// @route   GET api/community/highlights
router.get('/highlights', async (req, res) => {
  try {
    const items = await Highlight.find();
    res.json(items);
  } catch (err) { res.status(500).send('Server Error'); }
});

// @route   GET api/community/discussions
router.get('/discussions', async (req, res) => {
  try {
    const items = await Discussion.find();
    res.json(items);
  } catch (err) { res.status(500).send('Server Error'); }
});

// @route   GET api/community/events
router.get('/events', async (req, res) => {
  try {
    const items = await CommunityEvent.find();
    res.json(items);
  } catch (err) { res.status(500).send('Server Error'); }
});

module.exports = router;