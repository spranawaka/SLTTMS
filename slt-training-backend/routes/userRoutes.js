// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/insertUser', userController.insertUser);
router.put('/:id', userController.updateUser);
router.get('/', userController.getUsers);
router.get('/device/:deviceCode', userController.getUserByDevice);
router.put('/user/:id', userController.updateUser)

module.exports = router;