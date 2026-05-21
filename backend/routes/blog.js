const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

router.get('/', async (req, res) => {
  try { const blogs = await Blog.find().sort({ date: -1 }); res.json(blogs); } 
  catch (err) { res.status(500).send('Server Error'); }
});

router.post('/', async (req, res) => {
  try { const blog = await new Blog(req.body).save(); res.json(blog); } 
  catch (err) { res.status(500).send('Server Error'); }
});

module.exports = router;