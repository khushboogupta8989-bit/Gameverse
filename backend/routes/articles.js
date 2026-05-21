const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const User = require('../models/User');
const auth = require('../middleware/authmiddleware');

// @route   POST api/articles
// @desc    Create an article
router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const newArticle = new Article({
      ...req.body,
      author: user.username,
      authorId: user.id
    });

    const savedArticle = await newArticle.save(); 
    res.json(savedArticle);
  } catch (err) {
    console.error("Server Error:", err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ date: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/articles/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ msg: 'Article not found' });
    }
    
    const user = await User.findById(req.user.id);
    
    // Only Admin or the article author can delete
    // Check by authorId if available, otherwise fallback to username comparison for old articles
    const isAuthor = article.authorId 
      ? article.authorId.toString() === user.id 
      : article.author === user.username;

    if (user.role !== 'Admin' && !isAuthor) {
      return res.status(403).json({ msg: 'Not authorized to delete this article' });
    }
    
    await Article.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Article deleted successfully' });
  } catch (err) {
    console.error('Server Error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;