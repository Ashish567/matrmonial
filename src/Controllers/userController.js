const Joi = require('@hapi/joi');

const catchAsync = require('./../Utils/catchAsync');
const otphemaValidate = require('../Schema/otpValidateSchema');
const otpModel = require('../Models/userModel');

function joiValidateForProj(obj) {
  return Joi.validate(obj, otphemaValidate);
}
exports.createUser = catchAsync(async (req, res, next) => {});
exports.updateUser = catchAsync(async (req, res, next) => {});
exports.getUser = catchAsync(async (req, res, next) => {});
exports.deleteUser = catchAsync(async (req, res, next) => {});
