const router = require('express').Router()
const { EventEmitter } = require('node:events')
const {
  getDroneData,
  selectNewAndUpdatedDrones,
  findExpiredDrones,
} = require('../utils/droneData')
const { getPilotData } = require('../utils/pilotData')

let dronesInVicinity = {}

class MyEmitter extends EventEmitter {}

const droneEmitter = new MyEmitter()

// const handlePilotUpdate = (droneSerials) => {
//   const updatedPilots = structuredClone(oldPilots)
//   let serials = [...droneSerials]
//   Object.keys(oldPilots).forEach((serial) => {
//     if (!(serial in droneSerials)) {
//       delete updatedPilots.serial
//     }
//     serials = serials.filter((s) => s !== serial)
//   })
//   serials.forEach((s) => {
//     console.log('Getting pilot data for', s)
//     getPilotData(s).then((response) => {
//       updatedPilots[s] = response
//     })
//   })
//   return updatedPilots
// }

const handleUpdate = async (newData) => {
  const newDrones = newData.droneList
  const newSnapshotTime = newData.snapshotTime

  const dronesToUpdate = selectNewAndUpdatedDrones(
    newDrones,
    newSnapshotTime,
    dronesInVicinity
  )
  dronesToUpdate.forEach((drone) => {
    dronesInVicinity[drone.serial] = drone
  })

  const timeNow = new Date()
  const dronesToRemove = findExpiredDrones(dronesInVicinity, timeNow)
  dronesToRemove.forEach((drone) => {
    delete dronesInVicinity[drone.serial]
  })

  //TODO: Refactoring of pilot updates
  const dronesWithPilotsToUpdate = dronesToUpdate
    .filter((drone) => dronesInVicinity[drone.serial].pilot === undefined)
    .map((drone) => drone.serial)
  dronesWithPilotsToUpdate.forEach((serial) => {
    console.log('Getting pilot data for', serial)
    getPilotData(serial).then((response) => {
      dronesInVicinity[serial].pilot = response
    })
  })

  const needToUpdate =
    dronesToUpdate.length > 0 ||
    dronesToRemove.length > 0 ||
    dronesWithPilotsToUpdate.length > 0
  console.log('Need to update:', needToUpdate)
  return needToUpdate
}

const updateDrones = async (io) => {
  const newData = await getDroneData()
  const newSnapshotTime = newData.snapshotTime
  console.log('New data fetched:', newSnapshotTime)
  const needToUpdate = await handleUpdate(newData)
  if (needToUpdate) {
    //droneEmitter.emit('dronesUpdated', dronesWithPilots)
    io.emit('dronesUpdated', JSON.stringify(dronesInVicinity))
    console.log('Drones updated:', newSnapshotTime)
  }
}

router.get('/drones', (req, res) => {
  return res.json(dronesInVicinity)
})

module.exports = { router, updateDrones, droneEmitter }
