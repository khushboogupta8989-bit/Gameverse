const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const User = require('../models/User');

// Auto-fix username on every profile load
const fixUsername = async (profile) => {
  try {
    const user = await User.findById(profile.userId).select('username name email').lean();
    if (user) {
      const realName = user.username || user.name || (user.email ? user.email.split('@')[0] : 'Player');
      if (profile.username !== realName) {
        profile.username = realName;
        await profile.save();
      }
    }
  } catch (e) { /* silent */ }
  return profile;
};

router.get('/check/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('username name email').lean();
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ username: user.username || user.name || (user.email ? user.email.split('@')[0] : 'Player') });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.get('/:userId', async (req, res) => {
  try {
    let profile = await Profile.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    profile = await fixUsername(profile);
    res.json(profile.toObject());
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.post('/create', async (req, res) => {
  try {
    const { userId, username, about, avatar, banner, achievements } = req.body;
    if (!userId) return res.status(400).json({ message: 'userId is required' });
    const existing = await Profile.findOne({ userId });
    if (existing) return res.status(409).json({ message: 'Profile already exists' });

    let finalUsername = username || 'Player';
    if (finalUsername === 'Player') {
      const u = await User.findById(userId).select('username name email').lean();
      if (u) finalUsername = u.username || u.name || (u.email ? u.email.split('@')[0] : 'Player');
    }

    const profile = new Profile({
      userId, username: finalUsername, about: about || '',
      avatar: avatar || '', banner: banner || '',
      achievements: achievements || [],
    });
    await profile.save();
    res.status(201).json(profile);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.put('/update', async (req, res) => {
  try {
    const { userId, avatar, banner, about, stats } = req.body;
    if (!userId) return res.status(400).json({ message: 'userId is required' });
    const updateFields = {};
    if (avatar !== undefined) updateFields.avatar = avatar;
    if (banner !== undefined) updateFields.banner = banner;
    if (about !== undefined) updateFields.about = about;
    if (stats) {
      updateFields.stats = {};
      if (stats.winRate !== undefined) updateFields.stats.winRate = stats.winRate;
      if (stats.rank !== undefined) updateFields.stats.rank = stats.rank;
      if (stats.kdRatio !== undefined) updateFields.stats.kdRatio = stats.kdRatio;
    }
    if (Object.keys(updateFields).length === 0) return res.status(400).json({ message: 'No fields to update' });
    const profile = await Profile.findOneAndUpdate({ userId }, { $set: updateFields }, { new: true, runValidators: true });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.post('/add-game', async (req, res) => {
  try {
    const { userId, name, image, link } = req.body;
    if (!userId || !name || !link) return res.status(400).json({ message: 'userId, name, and link are required' });
    let profile = await Profile.findOne({ userId });
    if (!profile) {
      let uname = 'Player';
      const u = await User.findById(userId).select('username name email').lean();
      if (u) uname = u.username || u.name || (u.email ? u.email.split('@')[0] : 'Player');
      profile = new Profile({ userId, username: uname });
    }
    profile.addGame({ name, image: image || '', link });
    profile.addActivity(`Visited game: ${name}`);
    await profile.save();
    res.json(profile);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.post('/add-activity', async (req, res) => {
  try {
    const { userId, action } = req.body;
    if (!userId || !action) return res.status(400).json({ message: 'userId and action are required' });
    let profile = await Profile.findOne({ userId });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    profile.addActivity(action);
    const lower = action.toLowerCase();
    if (lower.includes('tournament')) profile.addAchievement('joined_tournament');
    if (lower.includes('quiz') || lower.includes('level')) profile.addAchievement('quiz_completed');
    await profile.save();
    res.json(profile);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;