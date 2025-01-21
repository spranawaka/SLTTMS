// config/config.js
module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8088,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
};