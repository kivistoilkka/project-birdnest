const express = require('express')
require('express-async-errors')
const app = express()

const cors = require('cors')
app.use(cors())

const dronesRouter = require('./controllers/drones').router
const middleware = require('./utils/middleware')

app.use('/api/', dronesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
