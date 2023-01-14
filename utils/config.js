require('dotenv').config()

let PORT = process.env.PORT || 3001
let DRONE_DATA_URL =
  process.env.DRONE_DATA_URL ||
  'https://assignments.reaktor.com/birdnest/drones'
let PILOT_DATA_URL =
  process.env.PILOT_DATA_URL ||
  'https://assignments.reaktor.com/birdnest/pilots'
let PILOT_INFORMATION_PERSIST_TIME =
  process.env.PILOT_INFORMATION_PERSIST_TIME || 600000
let DRONE_DATA_UPDATE_INTERVAL = process.env.DRONE_DATA_UPDATE_INTERVAL || 2000
let NO_FLY_ZONE_RADIUS = process.env.NO_FLY_ZONE_RADIUS || 100000

module.exports = {
  PORT,
  DRONE_DATA_URL,
  PILOT_DATA_URL,
  PILOT_INFORMATION_PERSIST_TIME,
  DRONE_DATA_UPDATE_INTERVAL,
  NO_FLY_ZONE_RADIUS,
}
