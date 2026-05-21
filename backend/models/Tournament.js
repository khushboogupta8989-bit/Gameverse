const mongoose = require('mongoose');

const TournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  game: { type: String, required: true },
  status: { type: String, enum: ['Live', 'Upcoming', 'Completed'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  location: { type: String },
  format: { type: String },
  prizePool: { type: String },
  region: { type: String },
  banner: { type: String }, // Stores the key like "cardEsl"
  description: { type: String },
  officialWebsite: { type: String },
  streamLink: { type: String },
  teams: [{ type: String }]
});

module.exports = mongoose.model('Tournament', TournamentSchema);