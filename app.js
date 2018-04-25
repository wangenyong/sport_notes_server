const express = require('express')
const app = express()
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const indexRouter = require('./api/routes/index')
const sportsRoutes = require('./api/routes/sports')
const userRoutes = require('./api/routes/user')

mongoose.connect('mongodb://mongo:27017/sport_notes' )

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/sports', sportsRoutes)
app.use('/user', userRoutes)


module.exports = app