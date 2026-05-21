const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// @route   GET api/contact/test-email
// This is for diagnostics only
router.get('/test-email', async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.verify();
    res.json({ msg: 'Email service is connected and ready!' });
  } catch (err) {
    console.error("Transporter Verification Failed:", err);
    res.status(500).json({ error: err.message });
  }
});

// @route   POST api/contact
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Simple Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // 1. Save to Database
    const newMsg = new Contact({
      name,
      email,
      subject,
      message
    });
    await newMsg.save();

    // 2. Send Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `GameVerse Contact: ${subject}`,
      text: `You have a new message from ${name} (${email}):\n\n${message}`
    };

    // Only attempt to send if credentials are provided
    if (process.env.EMAIL_PASS) {
      await transporter.sendMail(mailOptions);
    } else {
      console.warn("Email not sent: EMAIL_PASS not configured in .env");
    }

    res.json({ msg: 'Message sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;