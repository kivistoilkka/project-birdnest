const distanceCalculator =
  require('../utils/distanceCalculator').distanceCalculator

test('distance 0 when point and target point are at same coordinates', () => {
  const result = distanceCalculator(7, 7, 7, 7)
  expect(result).toBeCloseTo(0, 3)
})

test('correct distance for a point in upper right of target point in 10x10 grid with (5,5) as target point', () => {
  const result = distanceCalculator(7, 7, 5, 5)
  expect(result).toBeCloseTo(2.828, 3)
})

test('correct distance for a point in lower right of target point in 10x10 grid with (5,5) as target point', () => {
  const result = distanceCalculator(3, 7, 5, 5)
  expect(result).toBeCloseTo(2.828, 3)
})

test('correct distance for a point in lower left of target point in 10x10 grid with (5,5) as target point', () => {
  const result = distanceCalculator(3, 3, 5, 5)
  expect(result).toBeCloseTo(2.828, 3)
})

test('correct distance for a point in upper left of target point in 10x10 grid with (5,5) as target point', () => {
  const result = distanceCalculator(7, 3, 5, 5)
  expect(result).toBeCloseTo(2.828, 3)
})

test('correct distance with negative numbers', () => {
  const result = distanceCalculator(-2, -2, 0, 0)
  expect(result).toBeCloseTo(2.828, 3)
})

test('correct distance calculated with realistic numbers when point is same as default target point', () => {
  const result = distanceCalculator(250000, 250000)
  expect(result).toBeCloseTo(0, 3)
})

test('correct distance calculated with realistic numbers', () => {
  const result = distanceCalculator(190000, 700000)
  expect(result).toBeCloseTo(453982.379, 3)
})
