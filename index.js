const app = require('./app')
const http = require('http')
const { Server } = require('socket.io')
const config = require('./utils/config')
const droneEmitter = require('./controllers/drones').droneEmitter

const server = http.createServer(app)
const io = new Server(server)

droneEmitter.on('dronesUpdated', (drones) => {
  io.emit('dronesUpdated', JSON.stringify(drones))
})

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
