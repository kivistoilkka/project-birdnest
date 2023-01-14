const { NO_FLY_ZONE_RADIUS } = require('../utils/config')

const router = require('express').Router()
const { getData, filterExpiredDrones } = require('../utils/droneData')

let dronesInVicinity = {}

const updateDrones = async () => {
  const newData = await getData()
  //TODO: handle error from server (e.g. too many queries)
  const newDrones = newData.dronesJson
  const newSnapshotTime = newData.snapshotTime

  const updatedDrones = structuredClone(dronesInVicinity)
  newDrones.forEach((drone) => {
    let oldDistance = Number.MAX_SAFE_INTEGER
    if (drone.serial in dronesInVicinity) {
      oldDistance = parseFloat(dronesInVicinity[drone.serial].distance)
    }
    if (drone.distance < NO_FLY_ZONE_RADIUS) {
      updatedDrones[drone.serial] = {
        snapShotTime: newSnapshotTime,
        positionX: drone.positionX,
        positionY: drone.positionY,
        distance: Math.min(oldDistance, parseFloat(drone.distance)).toString(),
      }
    }
  })

  const filteredDrones = filterExpiredDrones(updatedDrones)

  dronesInVicinity = filteredDrones
  console.log('Drones updated:', newSnapshotTime)
  console.log(dronesInVicinity)
}

router.get('/drones', (req, res) => {
  return res.json(dronesInVicinity)
})

module.exports = { router, updateDrones }
