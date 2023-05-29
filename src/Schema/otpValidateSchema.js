const Joi = require('@hapi/joi');

const otphemaValidate = {
  phoneNo: Joi.string()
    .min(5)
    .max(14)
    .required(),
  countryCode: Joi.string()
    .min(1)
    .max(5)
    .required()
};
module.exports = otphemaValidate;
