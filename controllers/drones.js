const router = require('express').Router()

//let drones = {}
let drones = {
  'SN-biFmem4lfL': {
    snapShotTime: '2023-01-14T16:42:18.359Z',
    positionX: '188180.85821004366',
    positionY: '315027.2074024313',
    distance: '21753.479428132378',
  },
  'SN-EZSugEzZaa': {
    snapShotTime: '2023-01-14T16:42:44.377Z',
    positionX: '293172.8595163385',
    positionY: '287262.1905530378',
    distance: '57029.52431529129',
  },
  'SN--lLEGGckgb': {
    snapShotTime: '2023-01-14T16:42:58.387Z',
    positionX: '280077.8237844714',
    positionY: '287866.07733790466',
    distance: '48358.19782177463',
  },
}

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
