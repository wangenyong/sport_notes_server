const mongoose = require('mongoose');

const sportSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: {
    type: Date,
    default: Date.now
  },
  category: String,
  duration: Number,
  duration_suffix: String,
  datasets: [{name: String, value: String}]
})

module.exports = mongoose.model('Sport', sportSchema);