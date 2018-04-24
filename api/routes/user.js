const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const request = require('request')
const redis = require('redis')
const redisStore = redis.createClient(6379, 'redis')
const config = require('../../config/config')
const crypto = require('crypto')

router.post('/authorization', function (req, res, next) {
  // 获取session_key expires_in openid 

  request.get({
    uri: 'https://api.weixin.qq.com/sns/jscode2session',
    json: true,
    qs: {
      grant_type: 'authorization_code',
      appid: config.appId,
      secret: config.appSecret,
      js_code: req.body.code
    }
  }, (err, response, data) => {
    if (response.statusCode === 200) {
      //TODO: 生成一个唯一字符串sessionid作为键，将openid和session_key作为值，存入redis，超时时间设置为2小时
      let secretValue = {
        openid: data.openid,
        session_key: data.session_key
      };
      crypto.randomBytes(16, function (err, buffer) {
        const token = buffer.toString('hex')
        // 将{token:JSON.stringify(secretValue)} 存入内存中，过期时间设置为微信小程序接口返回给我们的有效时间
        redisStore.set(token, JSON.stringify(secretValue), 'EX', data.expires_in)
        res.status(200).json({
          wxtoken: token
        })
      })
    } else {
      res.status(500).json(err);
    }
  })
})

module.exports = router;