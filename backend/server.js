const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// 1. Connect Database
connectDB();

// 2. Middleware
app.use(express.json());
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
if (process.env.FRONTEND_URL) {
  process.env.FRONTEND_URL.split(',').forEach((url) => {
    const trimmed = url.trim();
    if (trimmed) allowedOrigins.push(trimmed);
  });
}
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-auth-token', 'Authorization']
}));

// 3. API Routes
try {
  // All profile logic should be inside this auth route file
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/games', require('./routes/games'));
  app.use('/api/articles', require('./routes/articles'));
  app.use('/api/quiz', require('./routes/quiz'));
  app.use('/api/players', require('./routes/players'));
  app.use('/api/contact', require('./routes/contact'));
  app.use('/api/community', require('./routes/community'));
  app.use('/api/tournaments', require('./routes/tournament'));
  const profileRoutes = require('./routes/profile');
  app.use('/api/profile', profileRoutes);

} catch (err) {
  console.error("ROUTE LOADING ERROR:", err.message);
}

// 4. Static Files (For Deployment)
// Only uncomment these when you have a 'build' folder ready
// app.use(express.static(path.join(__dirname, '../build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../', 'build', 'index.html'));
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));