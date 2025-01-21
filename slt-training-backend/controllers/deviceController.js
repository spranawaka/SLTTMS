// controllers/deviceController.js
const Device = require('../models/Device');
const Department = require('../models/Department');
const User = require('../models/User');

exports.addDevice = async (req, res) => {
  try {
    const { DeviceCode, departmentId, location } = req.body;

    // Check if device already exists
    let device = await Device.findOne({ DeviceCode });
    if (device) {
      return res.status(400).json({ 
        success: false, 
        message: "Device code already exists" 
      });
    }

    // Check if department exists
    const department = await Department.findOne({ departmentId });
    if (!department) {
      return res.status(400).json({ 
        success: false, 
        message: "Department not found" 
      });
    }

    // Create new device
    device = new Device({
      DeviceCode,
      location,
      department: department._id
    });

    await device.save();

    // Add device to department's devices array
    department.devices.push(device._id);
    await department.save();

    res.status(201).json({
      success: true,
      message: "Device registered successfully",
      data: device
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.checkUser = async (req, res) => {
  try {
    const { uid, DeviceCode } = req.body;

    // Check if device exists and get its department
    const device = await Device.findOne({ DeviceCode }).populate('department');
    if (!device) {
      return res.status(404).json({ 
        success: false, 
        message: "Device not found" 
      });
    }

    const user = await User.findOne({ uid });
    if (!user) {
      return res.json({ 
        success: true, 
        exists: false,
        message: "User not found" 
      });
    }

    // Check if user belongs to the device's department
    if (user.department && user.department.toString() !== device.department._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "User does not belong to this department"
      });
    }

    res.json({ 
      success: true,
      exists: true,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        department: device.department.name
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};