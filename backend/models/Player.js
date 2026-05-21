const mongoose = require('mongoose');

const SocialSchema = new mongoose.Schema({
  youtube: { type: String },
  instagram: { type: String },
  twitter: { type: String }
}, { _id: false });

const PlayerSchema = new mongoose.Schema({
  rank: { type: Number, required: true },
  name: { type: String, required: true },
  realName: { type: String },
  game: { type: String, required: true },
  region: { type: String },
  team: { type: String },
  score: { type: Number, required: true },
  matches: { type: Number },
  wins: { type: Number },
  kd: { type: Number },
  winRate: { type: String },
  achievements: { type: String },
  gameId: { type: String },
  socials: { type: SocialSchema }
});

module.exports = mongoose.model('Player', PlayerSchema);