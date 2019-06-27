export const isI = (
  shoulderLeftY,
  wristLeftY,
  hipLeftY,
  shoulderRightY,
  wristRightY,
  hipRightY
) => {
  if (
    (shoulderLeftY - wristLeftY) / (hipLeftY - shoulderLeftY) > 0.7 &&
    (shoulderRightY - wristRightY) / (hipRightY - shoulderRightY) > 0.7
  ) {
    return 'isI'
  }
}

export const isT = (
  shoulderLeftY,
  wristLeftY,
  elbowLeftY,
  shoulderRightY,
  wristRightY,
  elbowRightY
  // wristLeftX,
  // elbowLeftX,
  // wristRightX,
  // elbowRightX
) => {
  if (
    Math.abs(wristLeftY - shoulderLeftY) < 0.25 * shoulderLeftY &&
    Math.abs(wristRightY - shoulderRightY) < 0.25 * shoulderRightY &&
    Math.abs(elbowLeftY - shoulderLeftY) < 0.25 * shoulderLeftY &&
    Math.abs(elbowRightY - shoulderRightY) < 0.25 * shoulderRightY
    // wristLeftX > elbowLeftX &&
    // wristRightX < elbowRightX
  ) {
    return 'isT'
  }
}
