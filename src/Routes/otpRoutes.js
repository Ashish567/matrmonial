const express = require('express');

const otpController = require('./../Controllers/otpController');

const router = express.Router();

router.post('/getOtp', otpController.getOtp);
router.get('/verifyOtp', otpController.verifyOtp);

module.exports = router;
