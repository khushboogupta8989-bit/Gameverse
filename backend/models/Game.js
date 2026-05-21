const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fullName: { type: String, required: true },
  genre: { type: String, required: true },
  imageKey: { type: String, required: true }, // THIS IS CRITICAL
  rating: { type: Number, required: true },
  releaseYear: { type: Number, required: true },
  platforms: [{ type: String }],
  developer: { type: String, required: true },
  publisher: { type: String, required: true },
  description: { type: String, required: true },
  esports: { type: String },
  playerBase: { type: String },
  officialSite: { type: String },
  popularity: { type: Number }
});

module.exports = mongoose.model('Game', GameSchema);