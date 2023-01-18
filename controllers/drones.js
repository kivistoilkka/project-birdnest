const router = require('express').Router()
const {
  getDroneData,
  selectNewAndUpdatedDrones,
  findExpiredDrones,
} = require('../utils/droneData')
const { getPilotData } = require('../utils/pilotData')

let dronesInVicinity = {}

const handleUpdate = async (newData) => {
  const newDrones = newData.droneList
  const newSnapshotTime = newData.snapshotTime

  const dronesToUpdate = selectNewAndUpdatedDrones(
    newDrones,
    newSnapshotTime,
    dronesInVicinity
  )
  dronesToUpdate.forEach((drone) => {
    let pilot = null
    if (
      dronesInVicinity[drone.serial] !== undefined &&
      dronesInVicinity[drone.serial].pilot !== undefined
    )
      pilot = dronesInVicinity[drone.serial].pilot
    dronesInVicinity[drone.serial] = drone
    if (pilot !== null) {
      dronesInVicinity[drone.serial].pilot = pilot
    }
  })

  const timeNow = new Date()
  const dronesToRemove = findExpiredDrones(dronesInVicinity, timeNow)
  dronesToRemove.forEach((drone) => {
    delete dronesInVicinity[drone.serial]
  })

  const dronesWithPilotsToUpdate = Object.keys(dronesInVicinity).filter(
    (serial) => dronesInVicinity[serial].pilot === undefined
  )
  dronesWithPilotsToUpdate.forEach((serial) => {
    getPilotData(serial).then((response) => {
      dronesInVicinity[serial].pilot = response
    })
  })

  const needToUpdate =
    dronesToUpdate.length > 0 ||
    dronesToRemove.length > 0 ||
    dronesWithPilotsToUpdate.length > 0
  return {
    needToUpdate,
    dronesToUpdate,
    dronesToRemove,
    dronesWithPilotsToUpdate,
  }
}

const updateDrones = async (io) => {
  const newData = await getDroneData()
  const {
    needToUpdate,
    dronesToUpdate,
    dronesToRemove,
    dronesWithPilotsToUpdate,
  } = await handleUpdate(newData)
  if (needToUpdate) {
    if (dronesToUpdate.length > 0) {
      io.emit('dronesUpdated', JSON.stringify(dronesInVicinity))
    }
    if (dronesToRemove.length > 0) {
      io.emit('dronesUpdated', JSON.stringify(dronesInVicinity))
    }
    if (dronesWithPilotsToUpdate.length > 0) {
      io.emit('dronesUpdated', JSON.stringify(dronesInVicinity))
    }
  }
}

router.get('/drones', (req, res) => {
  return res.json(dronesInVicinity)
})

module.exports = { router, updateDrones }
