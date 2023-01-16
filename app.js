const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const dronesRouter = require('./controllers/drones').router
const middleware = require('./utils/middleware')

app.use('/api/', dronesRouter)

app.use(middleware.unknownEndpoint)

module.exports = app
