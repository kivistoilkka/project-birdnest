const router = require('express').Router()
const { EventEmitter } = require('node:events')
const {
  getDroneData,
  addNewDronesAndUpdateDistances,
  filterExpiredDrones,
} = require('../utils/droneData')
const { updatePilots } = require('../utils/pilotData')

let dronesInVicinity = {}
let pilots = {}
let dronesWithPilots = {}

class MyEmitter extends EventEmitter {}

const droneEmitter = new MyEmitter()

const updateDrones = async () => {
  const newData = await getDroneData()
  //TODO: handle error from server (e.g. too many queries)
  const newDrones = newData.dronesJson
  const newSnapshotTime = newData.snapshotTime

  const updatedDrones = await addNewDronesAndUpdateDistances(
    newDrones,
    newSnapshotTime,
    dronesInVicinity
  )
  const filteredDrones = filterExpiredDrones(updatedDrones)

  dronesInVicinity = filteredDrones

  const updatedPilots = await updatePilots(
    Object.keys(dronesInVicinity),
    pilots
  )
  pilots = updatedPilots

  const updatedDronesWithPilots = {}
  Object.keys(dronesInVicinity).forEach((serial) => {
    updatedDronesWithPilots[serial] = dronesInVicinity[serial]
    updatedDronesWithPilots[serial].pilot = pilots[serial]
  })
  dronesWithPilots = updatedDronesWithPilots

  droneEmitter.emit('dronesUpdated', dronesWithPilots)
  console.log('Drones updated:', newSnapshotTime)
}

router.get('/drones', (req, res) => {
  return res.json(dronesWithPilots)
})

module.exports = { router, updateDrones, droneEmitter }
