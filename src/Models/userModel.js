const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

const userSchema = mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.String
    },
    phoneNo: {
      type: mongoose.Schema.Types.String,
      required: [true, 'Request must have a phone no.']
    },
    role: {
      type: mongoose.Schema.Types.String,
      enum: ['Bride', 'Groom']
    },
    dob: {
      type: mongoose.Schema.Types.Date
    },
    motherTongue: {
      type: mongoose.Schema.Types.String
    },
    religion: {
      type: mongoose.Schema.Types.String
    },
    location: {
      type: pointSchema
    },
    locationString: {
      type: mongoose.Schema.Types.String
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: function(v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: 'Please enter a valid email'
      }
    },
    maritalStatus: {
      type: mongoose.Schema.Types.String,
      enum: ['Married', 'Unmarried', 'Divorced']
    },
    height: {
      type: mongoose.Schema.Types.String
    },
    caste: {
      type: mongoose.Schema.Types.String
    },
    birthStar: {
      type: mongoose.Schema.Types.String
    },
    disability: {
      type: mongoose.Schema.Types.String,
      enum: ['Yes', 'No']
    },
    education: {
      type: mongoose.Schema.Types.String
    },
    job: {
      type: mongoose.Schema.Types.String
    },
    bio: {
      type: mongoose.Schema.Types.String
    },
    food: {
      type: mongoose.Schema.Types.String,
      enum: ['Vegetarian', 'Non-Vegetarian', 'Both']
    },
    drinking: {
      type: mongoose.Schema.Types.String,
      enum: ['Yes', 'No', 'Ocassional']
    },
    smoking: {
      type: mongoose.Schema.Types.String,
      enum: ['Yes', 'No', 'Ocassional']
    },
    ideologies: {
      type: mongoose.Schema.Types.String
    },
    interests: {
      type: [mongoose.Schema.Types.String]
    },
    profilePic: {
      type: [mongoose.Schema.Types.String]
    },
    showMyFullName: {
      type: mongoose.Schema.Types.Boolean
    },
    showMyDob: {
      type: mongoose.Schema.Types.Boolean
    },
    showMyLocation: {
      type: mongoose.Schema.Types.Boolean
    },
    referalCode: {
      type: mongoose.Schema.Types.String
    },
    isActive: {
      type: mongoose.Schema.Types.Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('USER', userSchema);
