const Joi = require('@hapi/joi');

const catchAsync = require('./../Utils/catchAsync');
const {
  userShemaOneValidate,
  userShemaTwoValidate,
  userShemaThreeValidate,
  userShemaFourValidate,
  userShemaFiveValidate
} = require('../Schema/userShemaOneValidate');
const userModel = require('../Models/userModel');

userModel.createIndexes({
  locationString: 'text'
});
function joiValidateForProj(obj, page) {
  switch (page) {
    case 1:
      return Joi.validate(obj, userShemaOneValidate);
    case 2:
      return Joi.validate(obj, userShemaTwoValidate);
    case 3:
      return Joi.validate(obj, userShemaThreeValidate);
    case 4:
      return Joi.validate(obj, userShemaFourValidate);
    case 5:
      return Joi.validate(obj, userShemaFiveValidate);
    default:
      return null;
  }
}
exports.createUser = catchAsync(async (req, res, next) => {
  const { page } = req.query;
  const result = joiValidateForProj({ ...req.body }, page);
  if (result.error) {
    throw new Error(result.error.details[0].message);
  }
  let user;
  if (page === 1) {
    user = await userModel.create({
      ...req.body,
      phoneNo: req.phoneNo
    });
  } else {
    user = await userModel.findByIdAndUpdate(req.query.id, {
      ...req.body
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: user
    }
  });
});
exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await userModel.findOneAndUpdate(
    { id, isActive: true },
    {
      ...req.body
    }
  );
  res.status(200).json({
    status: 'success',
    data: {
      data: user
    }
  });
});
exports.getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await userModel.findById(id);
  res.status(200).json({
    status: 'success',
    data: {
      data: user.isActive ? user : { message: 'no user found!' }
    }
  });
});
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await userModel.findByIdAndUpdate(id, {
    isActive: false
  });
  res.status(200).json({
    status: 'success',
    data: {
      data: user
    }
  });
});

exports.getUsers = catchAsync(async (req, res, next) => {
  const { type } = req.query;
  let users;
  if (type === 'job') {
    users = userModel.find({
      job: req.query.job
    });
  }
  if (type === 'education') {
    users = userModel.find({
      job: req.query.education
    });
  }
  if (type === 'interests') {
    users = userModel.find({
      interests: {
        $in: [req.query.interests]
      }
    });
  }
  if (type === 'location') {
    users = userModel.find({
      $text: {
        $search: req.query.location
      }
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: users
    }
  });
});
