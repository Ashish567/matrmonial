const Joi = require('@hapi/joi');
const TelesignSDK = require('telesignenterprisesdk');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const catchAsync = require('./../Utils/catchAsync');
const otphemaValidate = require('../Schema/otpValidateSchema');
const otpModel = require('../Models/otpModel');

function joiValidateForProj(obj) {
  return Joi.validate(obj, otphemaValidate);
}
// Replace the defaults below with your Telesign authentication credentials.
const customerId =
  process.env.CUSTOMER_ID || 'E90A2E10-4117-4274-A8A6-B51CFC5D2C60';
const apiKey = process.env.API_KEY || '*********************************';

// Make the request and capture the response.
const client = new TelesignSDK(customerId, apiKey);

function compareAsync(param1, param2) {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(param1, param2, function(err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

// async function smsVerifyCallback(error, responseBody, res, verifyCode) {
//   console.log(verifyCode);
//   if (error === null) {
//     const hashedOtp = await bcrypt.hash(verifyCode, 10);
//     // Display the response body in the console for debugging purposes. In your production code, you would likely remove this.
//     const newOtpRequest = await otpModel.create({
//       phoneNo: responseBody.phoneNo,
//       countryCode: responseBody.countryCode,
//       hashedOtp
//     });
//     res.status(200).json({
//       status: 'success',
//       data: {
//         data: newOtpRequest
//       }
//     });
//   } else {
//     res.status(200).json({
//       status: 'failed',
//       message: 'something went wrong!'
//     });
//   }
// }

exports.getOtp = catchAsync(async (req, res, next) => {
  const result = joiValidateForProj({ ...req.body });
  if (result.error) {
    throw new Error(result.error.details[0].message);
  }
  // Generate verification code and add it to request parameters.
  const verifyCode = Math.floor(Math.random() * 99999).toString();
  const params = {
    verify_code: verifyCode
  };
  client.verify.sms(
    async function smsVerifyCallback(error) {
      if (error === null) {
        const hashedOtp = await bcrypt.hash(verifyCode, 10);
        // Display the response body in the console for debugging purposes. In your production code, you would likely remove this.
        const newOtpRequest = await otpModel.create({
          phoneNo: req.body.phoneNo,
          countryCode: req.body.countryCode,
          hashedOtp
        });
        res.status(200).json({
          status: 'success',
          data: {
            data: newOtpRequest
          }
        });
      } else {
        res.status(200).json({
          status: 'failed',
          message: 'something went wrong!'
        });
      }
    },
    req.body,
    params
  );
});

exports.verifyOtp = catchAsync(async (req, res, next) => {
  const { otpRequestId, otp } = req.body;

  if (!otpRequestId) {
    throw new Error('OTP request id is a must!');
  } else if (!otp) {
    throw new Error('OTP is a must!');
  }
  const requestOtp = await otpModel.findByIdAndUpdate(otpRequestId, {
    otpVerified: true
  });
  if (!requestOtp) {
    throw new Error('Something went wrong!');
  }
  const resp = await compareAsync(otp, requestOtp.hashedOtp);
  if (resp) {
    const token = jwt.sign(requestOtp, process.env.SECRET_KEY, {
      algorithm: 'HS256',
      expiresIn: '1000m' // Token Expiration
    });
    res.cookie('jwt', token, {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Cookie Expiration
      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });
    res.status(200).json({
      status: 'success',
      token: `Bearer ${token}`,
      message: 'No verfied successfully!'
    });
  }
});
