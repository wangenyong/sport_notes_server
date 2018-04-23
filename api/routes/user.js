const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const redis = require('redis');
const redisStore = redis.createClient();
const secret = require('../../config/secret');

router.get('/authorization', function (req, res, next) {
  // 获取session_key expires_in openid 

  request.get({
    uri: 'https://api.weixin.qq.com/sns/jscode2session',
    json: true,
    qs: {
      grant_type: 'authorization_code',
      appid: appId,
      secret: appSecret,
      js_code: req.query.code
    }
  }, (err, response, data) => {
    if (response.statusCode === 200) {
      console.log(data);
      //TODO: 生成一个唯一字符串sessionid作为键，将openid和session_key作为值，存入redis，超时时间设置为2小时
      let secretValue = {
        openid: data.openid,
        session_key: data.session_key
      };
      // 将{secret.SECRET:JSON.stringify(secretValue)} 存入内存中，过期时间设置为微信小程序接口返回给我们的有效时间
      redisStore.set(secret.SECRET, JSON.stringify(secretValue), 'EX', data.expires_in);
    } else {
      res.status(500).json(err);
    }
  });

  res.status(200).json({
    wxtoken: secret.SECRET
  })
})

module.exports = router;