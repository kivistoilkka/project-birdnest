const router = require('express').Router()

let drones = {}

router.get('/drones', (req, res) => {
  return res.json(drones)
})

router.get('/realtime-drones', (req, res) => {
  res.writeHead(200, {
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
  })
  setInterval(() => {
    res.write('data:' + JSON.stringify(drones))
    res.write('\\n\\n')
  }, 2000)
})

module.exports = router
