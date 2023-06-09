const mongoose = require('mongoose');

const otpSchema = mongoose.Schema(
  {
    phoneNo: {
      type: mongoose.Schema.Types.String,
      required: [true, 'Request must have a phone no.']
    },
    countryCode: {
      type: mongoose.Schema.Types.String,
      required: [true, 'Request must have a country code.']
    },
    hashedOtp: {
      type: mongoose.Schema.Types.String,
      default: ''
    },
    otpVerified: {
      type: mongoose.Schema.Types.Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('OTP', otpSchema);
