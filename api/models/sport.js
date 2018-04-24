const mongoose = require('mongoose')
const moment = require('moment')

moment.locale('zh-cn');

const sportSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  openid: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now,
    get: v => moment(v).format('MMMDo dddd')
  },
  category: String,
  duration: Number,
  duration_suffix: String,
  datasets: [{
    name: String,
    value: String
  }]
}, {
  toJSON: {
    getters: true
  }
})

module.exports = mongoose.model('Sport', sportSchema)