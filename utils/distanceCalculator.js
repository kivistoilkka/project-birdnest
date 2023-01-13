const distanceCalculator = (
  droneY,
  droneX,
  targetY = 250000,
  targetX = 250000
) => {
  const deltaY = droneY - targetY
  const deltaX = droneX - targetX
  return Math.hypot(deltaX, deltaY)
}

module.exports = { distanceCalculator }
