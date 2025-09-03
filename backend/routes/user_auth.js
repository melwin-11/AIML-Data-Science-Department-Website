const express = require('express');
const { MongoClient } = require('mongodb');
const router = express.Router();

const uri = 'YOUR_MONGODB_ATLAS_CONNECTION_STRING';
const client = new MongoClient(uri);

router.get('/users', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('YOUR_DATABASE_NAME');
    const users = await db.collection('user_auth').find({}).toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
});

module.exports = router;