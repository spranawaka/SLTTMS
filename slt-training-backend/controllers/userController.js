// controllers/userController.js
const User = require('../models/User');
const Device = require('../models/Device');
const Department = require('../models/Department');

exports.insertUser = async (req, res) => {
  try {
    const { uid, module, DeviceCode } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ uid });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: "User already exists" 
      });
    }

    // Check if device exists and get its department
    const device = await Device.findOne({ DeviceCode }).populate('department');
    if (!device) {
      return res.status(404).json({ 
        success: false, 
        message: "Device not found" 
      });
    }

    // Create new user
    const tempEmail = `pending_${uid}@temporary.com`;
    const user = new User({
      uid,
      rfidModule: module,
      deviceCode: DeviceCode,
      name: "New User",
      email: tempEmail,
      department: device.department._id
    });

    await user.save();

    // Add user to department's students array
    await Department.findByIdAndUpdate(
      device.department._id,
      { $push: { students: user._id } }
    );

    res.status(201).json({ 
      success: true,
      message: "User registered successfully",
      data: user
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      laptopSerial, 
      photo,
      departmentId 
    } = req.body;

    // Check if department exists
    const department = await Department.findOne({ departmentId });
    if (!department) {
      return res.status(404).json({ 
        success: false, 
        message: "Department not found" 
      });
    }

    // Update user
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        phone,
        laptopSerial,
        photo,
        department: department._id
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Update department's students array
    await Department.findByIdAndUpdate(
      department._id,
      { $addToSet: { students: user._id } }
    );

    res.json({
      success: true,
      message: "User updated successfully",
      data: user
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate('department', 'name departmentId');
    
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getUserByDevice = async (req, res) => {
  try {
    const user = await User.findOne({ deviceCode: req.params.deviceCode })
      .populate('department', 'name departmentId');
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};