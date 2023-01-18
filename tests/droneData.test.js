const {
  selectNewAndUpdatedDrones,
  findExpiredDrones,
} = require('../utils/droneData')

const testData = {
  'SN-mXT4QVifIn': {
    serial: 'SN-mXT4QVifIn',
    snapShotTime: '2023-01-18T16:48:04.745Z',
    distance: '44512.171174874755', // Closer in testDrones
    pilot: {
      name: 'Wilderman, Janet',
      email: 'janet.wilderman@example.com',
      phoneNumber: '+210060604913',
    },
  },
  'SN-xw9mRa7f4F': {
    serial: 'SN-xw9mRa7f4F',
    snapShotTime: '2023-01-18T16:48:20.768Z',
    distance: '58479.82513604958', // Outside of no fly zone in testDrones
    pilot: {
      name: 'Nader, Louvenia',
      email: 'louvenia.nader@example.com',
      phoneNumber: '+210562124533',
    },
  },
  'SN-i3rZWAX0vo': {
    serial: 'SN-i3rZWAX0vo',
    snapShotTime: '2023-01-18T15:48:34.778Z', // Expired data
    distance: '38808.19498254663',
    pilot: {
      name: 'Leffler, Matteo',
      email: 'matteo.leffler@example.com',
      phoneNumber: '+210600643142',
    },
  },
  'SN-Uygs87pACv': {
    serial: 'SN-Uygs87pACv',
    snapShotTime: '2023-01-18T16:48:54.796Z',
    distance: '90887.10196451072',
    pilot: {
      name: 'Padberg, Colton',
      email: 'colton.padberg@example.com',
      phoneNumber: '+210403109563',
    },
  },
  'SN-RAobIrdG-J': {
    serial: 'SN-RAobIrdG-J',
    snapShotTime: '2023-01-18T16:47:58.819Z', // Expired data
    distance: '51086.23293593422', // Closer than in testDrones, but time to be updated
    pilot: {
      name: 'Rohan, Damon',
      email: 'damon.rohan@example.com',
      phoneNumber: '+210071962488',
    },
  },
}

const testSnapshotTime = '2023-01-17T15:48:40.536Z'
const testDrones = [
  { serial: 'SN-RAobIrdG-J', distance: '64090.95751518291' }, // Existing drone, to update
  { serial: 'SN-mXT4QVifIn', distance: '27217.616139556932' }, // Existing drone, to update
  { serial: 'SN-xw9mRa7f4F', distance: '197794.63102029974' }, // Existing drone, but not to update
  { serial: 'SN-bwAA_-2IjJ', distance: '161320.87154301748' }, // Not to be added
  { serial: 'SN-Z12MPRUigk', distance: '56596.38979018068' }, // New drone
]

test('selectNewAndUpdatedDrones returns correct drones for update with empty old data with default settings', () => {
  const expectedResult = [
    {
      serial: 'SN-RAobIrdG-J',
      snapShotTime: '2023-01-17T15:48:40.536Z',
      distance: '64090.95751518291',
    },
    {
      serial: 'SN-mXT4QVifIn',
      snapShotTime: '2023-01-17T15:48:40.536Z',
      distance: '27217.616139556932',
    },
    {
      serial: 'SN-Z12MPRUigk',
      snapShotTime: '2023-01-17T15:48:40.536Z',
      distance: '56596.38979018068',
    },
  ]
  const emptyOldData = {}

  const result = selectNewAndUpdatedDrones(
    testDrones,
    testSnapshotTime,
    emptyOldData
  )

  for (let i = 0; i < result.length; i++) {
    expect(result[i].serial).toBe(expectedResult[i].serial)
    expect(result[i].snapShotTime).toBe(expectedResult[i].snapShotTime)
    expect(result[i].distance).toBe(expectedResult[i].distance)
  }
})

test('selectNewAndUpdatedDrones returns correct drones for update with existing old data with default settings', () => {
  const expectedResult = [
    {
      serial: 'SN-RAobIrdG-J',
      snapShotTime: '2023-01-17T15:48:40.536Z',
      distance: '51086.23293593422',
    },
    {
      serial: 'SN-mXT4QVifIn',
      snapShotTime: '2023-01-17T15:48:40.536Z',
      distance: '27217.616139556932',
    },
    {
      serial: 'SN-Z12MPRUigk',
      snapShotTime: '2023-01-17T15:48:40.536Z',
      distance: '56596.38979018068',
    },
  ]

  const result = selectNewAndUpdatedDrones(
    testDrones,
    testSnapshotTime,
    testData
  )
  for (let i = 0; i < result.length; i++) {
    expect(result[i].serial).toBe(expectedResult[i].serial)
    expect(result[i].snapShotTime).toBe(expectedResult[i].snapShotTime)
    expect(result[i].distance).toBe(expectedResult[i].distance)
    expect(result[i].pilot).toBeUndefined()
  }
})

test('findExpiredDrones returns correct drones for removal from old data with default settings', () => {
  const testTimeNow = '2023-01-18T16:48:10.745Z'
  const expectedResult = [
    {
      serial: 'SN-i3rZWAX0vo',
      snapShotTime: '2023-01-18T15:48:34.778Z',
      distance: '38808.19498254663',
      pilot: {
        name: 'Leffler, Matteo',
        email: 'matteo.leffler@example.com',
        phoneNumber: '+210600643142',
      },
    },
    {
      serial: 'SN-RAobIrdG-J',
      snapShotTime: '2023-01-18T16:47:58.819Z',
      distance: '51086.23293593422',
      pilot: {
        name: 'Rohan, Damon',
        email: 'damon.rohan@example.com',
        phoneNumber: '+210071962488',
      },
    },
  ]

  const result = findExpiredDrones(testData, testTimeNow)
  for (let i = 0; i < result.length; i++) {
    expect(result[i].serial).toBe(expectedResult[i].serial)
    expect(result[i].snapShotTime).toBe(expectedResult[i].snapShotTime)
    expect(result[i].distance).toBe(expectedResult[i].distance)
    expect(result[i].pilot.name).toBe(expectedResult[i].pilot.name)
    expect(result[i].pilot.email).toBe(expectedResult[i].pilot.email)
    expect(result[i].pilot.phoneNumber).toBe(
      expectedResult[i].pilot.phoneNumber
    )
  }
})
