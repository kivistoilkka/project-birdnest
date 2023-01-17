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

module.exports = { getPilotData } //updatePilots }
