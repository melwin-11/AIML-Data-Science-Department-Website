const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const authenticateToken = require('../middleware/auth');
const UserAuth = require('../databases/models/UserAuth');
const mongoose = require('mongoose'); // Import your Mongoose user model

const app = express();
const router = express.Router();
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
app.use(express.json()); // Parse JSON bodies

// Log every incoming request on this router
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Request received: ${req.method} ${req.url}`);
  next();
});

router.post('/login', async (req, res) => {
  console.log('POST /login body:', req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    console.error('Missing email or password in request');
    return res.status(400).json({ error: 'Email and password required' });
  }

  try {
    console.log('Searching for user with email:', email);
    const user = await UserAuth.findOne({ email }).exec();
    console.log('Database query returned:', user);

    if (!user || user.password !== password) {
      console.error('User not found or password mismatch');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const payload = { email: user.email, id: user._id };
    console.log('JWT payload:', payload);

    if (!config.jwtSecret) {
      console.error('Missing jwtSecret in config');
      return res.status(500).json({ error: 'Server config error' });
    }
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });

    console.log('Token created:', token);
    res.json({ token });
  }
  catch (error) {
    console.error('--- ERROR DURING LOGIN ---');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/profile', authenticateToken, (req, res) => {
  console.log('GET /profile with user:', req.user);
  res.json({ user: req.user });
});

// Mount the router
app.use('/', router);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
  console.log(`[${new Date().toISOString()}] Ready for requests`);
});
