const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('../Utils/appError');
const catchAsync = require('../Utils/catchAsync');

const otpModel = require('../Models/otpModel');

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3) Check if user still exists
  const otp = await otpModel.findById(decoded.id);
  if (!otp.otpVerified) {
    return next(new AppError('You must bverify the mobile no first.', 401));
  }
  req.phoneNo = otp.phoneNo;
  next();
});
