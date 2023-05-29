const Joi = require('@hapi/joi');

const userShemaOneValidate = {
  name: Joi.string()
    .min(5)
    .max(60)
    .required(),
  role: Joi.string().required(),
  dob: Joi.date().required(),
  motherTongue: Joi.string().required(),
  religion: Joi.string().required(),
  location: Joi.any().required()
};
const userShemaTwoValidate = {
  email: Joi.string()
    .email()
    .required(),
  maritalStatus: Joi.string().required(),
  height: Joi.number().required(),
  caste: Joi.string().required(),
  birthStar: Joi.string().required(),
  disability: Joi.string().required()
};
const userShemaThreeValidate = {
  education: Joi.string().required(),
  job: Joi.string().required(),
  bio: Joi.string()
    .min(3)
    .max(255)
    .required()
};
const userShemaFourValidate = {
  food: Joi.string().required(),
  drinking: Joi.string().required(),
  smoking: Joi.string().required(),
  ideologies: Joi.string().required(),
  interests: Joi.any().required()
};
const userShemaFiveValidate = {
  profilePic: Joi.any().required(),
  showMyFullName: Joi.boolean().required(),
  showMyDob: Joi.boolean().required(),
  showMyLocation: Joi.boolean().required(),
  referalCode: Joi.string()
};
module.exports = {
  userShemaOneValidate,
  userShemaTwoValidate,
  userShemaThreeValidate,
  userShemaFourValidate,
  userShemaFiveValidate
};
