const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  imageKey: { type: String },
  image: { type: String }, // Add this for URL-based images
  snippet: { type: String },
  content: { type: String, required: true },
  author: { type: String, default: 'Admin' },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  readTime: { type: String },
  date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Article', ArticleSchema);