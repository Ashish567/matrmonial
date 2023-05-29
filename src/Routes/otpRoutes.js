const express = require('express');

const otpController = require('./../Controllers/otpController');

const router = express.Router();

router.get('/', otpController.getOtp);
router.post('/', otpController.verifyOtp);

module.exports = router;
