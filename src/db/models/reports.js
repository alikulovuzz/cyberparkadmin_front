const mongoose = require("mongoose");


const reportSchema = new mongoose.Schema({
  name_of_report: {
    type: String,
    required: [true, 'Please, write your name_of_report at least'],
    trim: true,
    min: 4
  },
  file_link: {
    type: String,
    trim: true,
    min: 4
  },
  company_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Company' 
  },
  year: {
    type: String,
    default: null,
    trim: true,
    min: 1,
    // max: 8
  },
  quarterly: {
    type: String,
    default: null,
    enum: {
      values: ['first', 'second', 'third', 'fourth'],
      message: '{VALUE} is not supported'
    }
  },
  status: {
    type: String,
    default: 'not_in_progress',
    enum: {
      values: ['disabled', 'progress', 'finished', 'not_in_progress'],
      message: '{VALUE} is not supported'
    }
  }
},{ timestamps: true });


reportSchema.index({ company_id: 1}); // schema level

module.exports = mongoose.model("Report", reportSchema);