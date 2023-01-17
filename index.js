const app = require('./app')
const http = require('http')
const { Server } = require('socket.io')
const config = require('./utils/config')
//const droneEmitter = require('./controllers/drones').droneEmitter

const server = http.createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('error', (err) => {
    console.log('Caught flash policy server socket error:')
    console.log(err.stack)
  })

  // socket.on('dronesUpdated', (drones) => {
  //   io.emit('dronesUpdated', JSON.stringify(drones))
  // })
})

// droneEmitter.on('dronesUpdated', (drones) => {
//   io.emit('dronesUpdated', JSON.stringify(drones))
// })

const { DRONE_DATA_UPDATE_INTERVAL } = require('./utils/config')
const updateDrones = require('./controllers/drones').updateDrones
setInterval(() => updateDrones(io), DRONE_DATA_UPDATE_INTERVAL)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
