const axios = require('axios')
const { PILOT_DATA_URL } = require('./config')

const getPilotData = async (droneSerial) => {
  const response = await axios(`${PILOT_DATA_URL}/${droneSerial}`)
  const pilot = {
    name: `${response.data.lastName}, ${response.data.firstName}`,
    email: response.data.email,
    phoneNumber: response.data.phoneNumber,
  }
  return pilot
}

const updatePilots = async (droneSerials, oldPilots) => {
  const updatedPilots = structuredClone(oldPilots)
  let serials = [...droneSerials]
  Object.keys(oldPilots).forEach((serial) => {
    if (!(serial in droneSerials)) {
      delete updatedPilots.serial
    }
    serials = serials.filter((s) => s !== serial)
  })
  serials.forEach((s) => {
    getPilotData(s).then((response) => {
      updatedPilots[s] = response
    })
  })
  return updatedPilots
}

module.exports = { getPilotData, updatePilots }
