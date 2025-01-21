// routes/departmentRoutes.js
const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/deptController');

router.post('/create', departmentController.createDepartment);
router.get('/all', departmentController.getAllDepartments);
router.get('/:departmentId/students', departmentController.getDepartmentStudents);
router.get('/:departmentId/devices', departmentController.getDepartmentDevices);

module.exports = router;