const { convertXML } = require('simple-xml-to-json')
const { distanceCalculator } = require('./distanceCalculator')

const parseDroneData = (data) => {
  const dataJson = convertXML(data.data)
  const snapshotTime = dataJson.report.children[1].capture.snapshotTimestamp
  const drones = dataJson.report.children[1].capture.children
  const dronesJson = drones.map((d) => {
    const serial = d.drone.children[0].serialNumber.content
    const positionY = d.drone.children[7].positionY.content
    const positionX = d.drone.children[8].positionX.content
    const distance = distanceCalculator(
      parseFloat(positionY),
      parseFloat(positionX)
    )
    return {
      serial,
      positionY,
      positionX,
      distance: distance.toString(),
    }
  })
  return { snapshotTime, dronesJson }
}

module.exports = { parseDroneData }
