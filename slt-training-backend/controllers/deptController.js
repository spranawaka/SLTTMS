// controllers/departmentController.js
const Department = require('../models/Department');
const Device = require('../models/Device');
const User = require('../models/User');

exports.createDepartment = async (req, res) => {
  try {
    const { name, departmentId, location, description } = req.body;

    // Check if department already exists
    const existingDepartment = await Department.findOne({ departmentId });
    if (existingDepartment) {
      return res.status(400).json({ message: "Department ID already exists" });
    }

    // Create new department
    const department = new Department({
      name,
      departmentId,
      location,
      description,
      devices: [], // Initialize empty devices array
      students: [] // Initialize empty students array
    });

    const savedDepartment = await department.save();
    res.status(201).json({
      success: true,
      message: "Department created successfully",
      data: savedDepartment
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find()
      .populate('devices')
      .populate('students');
    
    res.status(200).json({
      success: true,
      data: departments
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getDepartmentStudents = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const department = await Department.findOne({ departmentId })
      .populate({
        path: 'students',
        select: 'name email phone uid laptopSerial photo'
      });

    if (!department) {
      return res.status(404).json({ 
        success: false, 
        message: "Department not found" 
      });
    }

    res.status(200).json({
      success: true,
      data: department.students
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getDepartmentDevices = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const department = await Department.findOne({ departmentId })
      .populate('devices');

    if (!department) {
      return res.status(404).json({ 
        success: false, 
        message: "Department not found" 
      });
    }

    res.status(200).json({
      success: true,
      data: department.devices
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};