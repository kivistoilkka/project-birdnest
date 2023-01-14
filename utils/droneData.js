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

const addNewDronesAndUpdateDistances = (newData, newSnapshotTime, oldData) => {
  const updatedDrones = structuredClone(oldData)
  newData.forEach((drone) => {
    let oldDistance = Number.MAX_SAFE_INTEGER
    if (drone.serial in oldData) {
      oldDistance = parseFloat(oldData[drone.serial].distance)
    }

    if (drone.distance < NO_FLY_ZONE_RADIUS) {
      updatedDrones[drone.serial] = {
        snapShotTime: newSnapshotTime,
        distance: Math.min(oldDistance, parseFloat(drone.distance)).toString(),
      }
    }
  })
  return updatedDrones
}

const filterExpiredDrones = (drones) => {
  const timeNow = new Date()
  const filteredDrones = Object.fromEntries(
    Object.entries(drones).filter(
      // eslint-disable-next-line no-unused-vars
      ([key, value]) =>
        timeNow - new Date(value.snapShotTime) < PILOT_INFORMATION_PERSIST_TIME
    )
  )
  return filteredDrones
}

module.exports = {
  getDroneData,
  addNewDronesAndUpdateDistances,
  filterExpiredDrones,
}
