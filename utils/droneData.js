const axios = require('axios')
const { parseDroneData } = require('./droneDataParser')
const { DRONE_DATA_URL, PILOT_INFORMATION_PERSIST_TIME } = require('./config')

const getData = async () => {
  const page = await axios(DRONE_DATA_URL)
  const parsedData = parseDroneData(page)
  return parsedData
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

module.exports = { getData, filterExpiredDrones }
