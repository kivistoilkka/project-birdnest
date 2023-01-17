const axios = require('axios')
const { parseDroneData } = require('./droneDataParser')
const {
  DRONE_DATA_URL,
  PILOT_INFORMATION_PERSIST_TIME,
  NO_FLY_ZONE_RADIUS,
} = require('./config')

const getDroneData = async () => {
  const page = await axios(DRONE_DATA_URL)
  const parsedData = parseDroneData(page.data)
  return parsedData
}

const selectNewAndUpdatedDrones = (newDrones, newSnapshotTime, oldData) => {
  const filtered = newDrones.filter(
    (drone) => parseFloat(drone.distance) < NO_FLY_ZONE_RADIUS
  )
  const toUpdate = filtered.map((drone) => {
    let oldDistance = Number.MAX_SAFE_INTEGER
    if (drone.serial in oldData) {
      oldDistance = parseFloat(oldData[drone.serial].distance)
    }
    return {
      serial: drone.serial,
      snapShotTime: newSnapshotTime,
      distance: Math.min(oldDistance, parseFloat(drone.distance)).toString(),
    }
  })
  return toUpdate
}

const findExpiredDrones = (drones, timeNow) => {
  const toRemove = Object.values(drones).filter(
    (drone) =>
      timeNow - new Date(drone.snapShotTime) > PILOT_INFORMATION_PERSIST_TIME
  )
  return toRemove
}

module.exports = {
  getDroneData,
  selectNewAndUpdatedDrones,
  findExpiredDrones,
}
