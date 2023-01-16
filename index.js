const app = require('./app')
const http = require('http')
const { Server } = require('socket.io')
const config = require('./utils/config')
const droneEmitter = require('./controllers/drones').droneEmitter

const server = http.createServer(app)
const io = new Server(server)

const { DRONE_DATA_UPDATE_INTERVAL } = require('./utils/config')

const updateDrones = require('./controllers/drones').updateDrones
setInterval(updateDrones, DRONE_DATA_UPDATE_INTERVAL)

droneEmitter.on('dronesUpdated', (drones) => {
  io.emit('dronesUpdated', JSON.stringify(drones))
})

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
