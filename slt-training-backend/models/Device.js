// models/Device.js
const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  DeviceCode: { type: String, required: true, unique: true },
  status: { type: Number, default: 0 },
  lastPing: { type: Date, default: Date.now },
  location: String,
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Device', deviceSchema);