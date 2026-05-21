const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // Fields from Login/Signup
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  // Fields from Profile UI
  avatar: { type: String, default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80' },
  level: { type: Number, default: 1 },
  rank: { type: String, default: 'Beginner' },
  bio: { type: String, default: 'Welcome to GameVerse!' },
  followers: { type: Number, default: 0 },
  following: { type: Number, default: 0 },
  
  role: { type: String, default: 'User' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);