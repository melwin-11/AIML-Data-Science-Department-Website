const mongoose = require('mongoose');

const userAuthSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String } // role is now optional
});

const UserAuth = mongoose.model('UserAuth', userAuthSchema, 'user_auth');
module.exports = UserAuth;
