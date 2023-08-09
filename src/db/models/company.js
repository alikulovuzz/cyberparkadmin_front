const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: [true, 'Please, write your company_name at least'],
    trim: true,
    min: 4,
  },
  stir: {
    type: String,
    required: [true],
    trim: true,
    min: 4,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    // unique: true,
    // required: 'Email address is required',
    // validate: [validateEmail, 'Please fill a valid email address'],
    // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  img_link: {
    type: String,
    default: null,
    trim: true,
    min: 4
  },
  phone: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    // Validation succeeds! Phone number is defined
    // and fits `DDD-DDD-DDDD`
    // validate: {
    //   validator: function (v) {
    //     return /\d{2}-\d{3}-\d{4}/.test(v);
    //   },
    //   message: props => `${props.value} is not a valid phone number!`
    // },
    // required: [true, 'Admin phone number required'],
    min: 7
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 4
  },
  role: [
    {
      type: String,
      enum: {
        values: ['admin', 'superAdmin'],
        message: '{VALUE} is not supported'
      },
      default: ['admin']
    }
  ],
  status: {
    type: String,
    enum: {
      values: ['resident', 'noResident'],
      message: '{VALUE} is not supported'
    },
    default: ['noResident']
  },
}, { timestamps: true });

companySchema.index({ stir:1,email: 1 }); // schema level

module.exports = mongoose.model("Company", companySchema);