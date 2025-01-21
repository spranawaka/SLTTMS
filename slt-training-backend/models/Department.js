// models/Department.js
const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  departmentId: { type: String, required: true, unique: true },
  location: String,
  description: String,
  devices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Device' }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema);