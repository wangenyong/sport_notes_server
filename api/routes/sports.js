const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Sport = require('../models/sport');

router.get('/', (req, res, next) => {
  res.status(200).json({
    mesage: 'sports'
  });
});

router.post('/', (req, res, next) => {
  const sport = new Sport({
    _id: new mongoose.Types.ObjectId(),
    category: req.body.category,
    duration: req.body.duration,
    duration_suffix: req.body.duration_suffix,
    datasets: req.body.datasets
  });

  sport
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Create sport successfully'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
});

module.exports = router;