const Joi = require('@hapi/joi');

const otphemaValidate = {
  phoneNo: Joi.string()
    .min(5)
    .max(13)
    .required(),
  countryCode: Joi.string()
    .min(1)
    .max(3)
    .required()
};
module.exports = otphemaValidate;
