const app = require('./app')
const http = require('http')
const { Server } = require('socket.io')
const config = require('./utils/config')

const server = http.createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
  console.log('a client connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  // socket.on('error', (err) => {
  //   console.log('Caught flash policy server socket error:')
  //   console.log(err.stack)
  // })
})

const { DRONE_DATA_UPDATE_INTERVAL } = require('./utils/config')
const updateDrones = require('./controllers/drones').updateDrones
setInterval(() => updateDrones(io), DRONE_DATA_UPDATE_INTERVAL)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
