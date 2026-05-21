const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  game: { type: String, required: true },
  author: { type: String, required: true },
  comments: { type: Number, default: 0 },
  likes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Discussion', DiscussionSchema);