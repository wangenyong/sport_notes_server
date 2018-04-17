const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
});

const itemSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: Date,
  type: String,
  duration: Number,
  duration_suffix: String,
  dataSets: [dataSchema]
})

module.exports = {
  Item: mongoose.model('Sport', itemSchema),
  Data: mongoose.model('SportData', dataSchema)
};