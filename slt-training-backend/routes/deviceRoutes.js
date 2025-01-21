// routes/deviceRoutes.js
const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');

router.post('/addDevice', deviceController.addDevice);
router.post('/checkUser', deviceController.checkUser);

module.exports = router;