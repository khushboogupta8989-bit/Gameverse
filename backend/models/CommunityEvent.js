const mongoose = require('mongoose');

const CommunityEventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  game: { type: String, required: true },
  date: { type: String, required: true },

  banner: { type: String, required: false }, // ✅ made optional

  imageKey: { type: String }, // ✅ ADD THIS LINE

  link: { type: String }
});

module.exports = mongoose.model('CommunityEvent', CommunityEventSchema);