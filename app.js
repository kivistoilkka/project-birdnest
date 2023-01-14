const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const dronesRouter = require('./controllers/drones').router
const middleware = require('./utils/middleware')
const { DRONE_DATA_UPDATE_INTERVAL } = require('./utils/config')

const updateDrones = require('./controllers/drones').updateDrones
setInterval(updateDrones, DRONE_DATA_UPDATE_INTERVAL)

app.use('/api/', dronesRouter)

app.use(middleware.unknownEndpoint)

module.exports = app
