const mongoose = require('mongoose');

const HighlightSchema = new mongoose.Schema({
  username: { type: String, required: true },
  avatar: { type: String, required: true },
  games: [{ type: String }],
  post: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  role: { type: String },
  achievements: [{ type: String }],
  socialLinks: {
    youtube: { type: String },
    instagram: { type: String },
    twitch: { type: String }
  }
});

module.exports = mongoose.model('Highlight', HighlightSchema);