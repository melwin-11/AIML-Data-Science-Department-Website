const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
  mongoURI: process.env.MONGODB_URI ,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 3000
};
