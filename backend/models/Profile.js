const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },
    about: {
      type: String,
      default: '',
      maxlength: 300,
    },
    avatar: {
      type: String,
      default: '',
    },
    banner: {
      type: String,
      default: '',
    },
    games: [
      {
        name: { type: String, required: true, trim: true },
        genre: { type: String, default: 'General' },
        link: { type: String, required: true },
        addedAt: { type: Date, default: Date.now },
      },
    ],
    achievements: { type: [String], default: [] },
    stats: {
      winRate: { type: Number, default: 0, min: 0, max: 100 },
      rank: { type: Number, default: 0, min: 0 },
      kdRatio: { type: Number, default: 0, min: 0 },
    },
    activity: [
      {
        action: { type: String, required: true, trim: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

profileSchema.methods.addGame = function (gameData) {
  const exists = this.games.some(
    (g) => g.name.toLowerCase() === gameData.name.toLowerCase()
  );
  if (!exists) {
    this.games.push({ 
      name: gameData.name, 
      genre: gameData.genre || 'General',
      link: gameData.link 
    });
    if (this.games.length === 1) this.addAchievement('first_game_click');
    if (this.games.length >= 5) this.addAchievement('five_games');
  }
  return this;
};

profileSchema.methods.addAchievement = function (id) {
  if (!this.achievements.includes(id)) this.achievements.push(id);
  return this;
};

profileSchema.methods.addActivity = function (action) {
  this.activity.unshift({ action });
  if (this.activity.length > 50) this.activity = this.activity.slice(0, 50);
  return this;
};

module.exports = mongoose.model('Profile', profileSchema);