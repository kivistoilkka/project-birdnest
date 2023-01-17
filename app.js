const express = require('express')
require('express-async-errors')
const app = express()

const cors = require('cors')
app.use(cors())

const { DRONE_DATA_UPDATE_INTERVAL } = require('./utils/config')

const updateDrones = require('./controllers/drones').updateDrones
setInterval(updateDrones, DRONE_DATA_UPDATE_INTERVAL)

const dronesRouter = require('./controllers/drones').router
const middleware = require('./utils/middleware')

app.use('/api/', dronesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
