// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  phone: String,
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  laptopSerial: String,
  photo: String,
  rfidModule: String,
  deviceCode: String,
  status: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema, 'tstudatas');