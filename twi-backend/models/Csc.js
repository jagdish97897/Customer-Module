
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CscSchema = new Schema({
  country: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true,

  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Csc', CscSchema);
