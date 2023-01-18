const parseDroneData = require('../utils/droneDataParser').parseDroneData

const testXML = require('./testXML').data

test('XML data is parsed correctly', () => {
  const expectedResult = {
    snapshotTime: '2023-01-17T15:48:40.536Z',
    droneList: [
      { serial: 'SN-RAobIrdG-J', distance: '64090.95751518291' },
      { serial: 'SN-mXT4QVifIn', distance: '27217.616139556932' },
      { serial: 'SN-xw9mRa7f4F', distance: '197794.63102029974' },
      { serial: 'SN-bwAA_-2IjJ', distance: '161320.87154301748' },
    ],
  }
  const result = parseDroneData(testXML)
  expect(result.snapshotTime).toBe(expectedResult.snapshotTime)
  expect(result.droneList.length).toBe(expectedResult.droneList.length)
  for (let i = 0; i < result.droneList.length; i++) {
    expect(result.droneList[i].serial).toBe(expectedResult.droneList[i].serial)
    expect(result.droneList[i].distance).toBe(
      expectedResult.droneList[i].distance
    )
  }
})
