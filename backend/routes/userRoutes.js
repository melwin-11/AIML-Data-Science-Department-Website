const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Placeholder user store
const users = [
  // Example user: { email: 'test@example.com', password: 'password123' }
];

// Login endpoint
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ email }, config.jwtSecret, { expiresIn: '1h' });
  res.json({ token });
});

// Example protected route
router.get('/profile', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
router.get('/profile', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
