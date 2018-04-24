const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const sportsRoutes = require('./api/routes/sports')
const userRoutes = require('./api/routes/user')

mongoose.connect('mongodb://mongo:27017/sport_notes' )

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/sports', sportsRoutes)
app.use('/user', userRoutes)


module.exports = app