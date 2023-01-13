const express = require('express')
const app = express()

const dronesRouter = require('./controllers/drones')
const middleware = require('./utils/middleware')

app.use('/api/', dronesRouter)

app.use(middleware.unknownEndpoint)

module.exports = app
