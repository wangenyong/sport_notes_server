const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const redis = require('redis')
const redisStore = redis.createClient(6379, 'redis')
const Sport = require('../models/sport')

router.get('/', (req, res, next) => {
  const sessionId = req.headers['sessionid']
  if (sessionId && sessionId.length > 0) {
    redisStore.get(sessionId, (err, data) => {
      if (err || !data) {
        res.status(500).json({
          message: '用户验证失败！'
        })
      } else {
        const value = JSON.parse(data)
        Sport.find()
          .select('-__v')
          .where('openid').equals(value.openid)
          .exec()
          .then(docs => {
            res.status(200).json(docs);
          })
          .catch(err => {
            res.status(500).json({
              message: '数据获取失败，请稍后重试！'
            })
          });
      }
    })
  } else {
    res.status(500).json({
      message: '用户不存在！'
    })
  }
});

router.post('/', (req, res, next) => {
  const sessionId = req.headers['sessionid']
  console.log(sessionId)
  if (sessionId && sessionId.length > 0) {
    redisStore.get(sessionId, (err, data) => {
      if (err || !data) {
        res.status(500).json({
          message: '用户验证失败！'
        })
      } else {
        const value = JSON.parse(data)
        const sport = new Sport({
          _id: new mongoose.Types.ObjectId(),
          openid: value.openid,
          date: req.body.date,
          category: req.body.category,
          duration: req.body.duration,
          duration_suffix: req.body.duration_suffix,
          datasets: req.body.datasets
        });

        sport.save()
          .then(result => {
            res.status(200).json({
              message: '数据保存成功！'
            });
          })
          .catch(err => {
            res.status(500).json({
              message: '数据保存失败，请稍后重试！'
            })
          });
      }
    })
  } else {
    res.status(500).json({
      message: '用户不存在！'
    })
  }

});

module.exports = router