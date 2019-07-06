const getObj = pose => {
  let obj = {}
  for (let idx = 0; idx < pose.keypoints.length; idx++) {
    obj[pose.keypoints[idx].part] = {
      x: pose.keypoints[idx].position.x,
      y: pose.keypoints[idx].position.y,
      score: pose.keypoints[idx].score
    }
  }
  return obj
}

const leftKneeIsUp = pose => {
  if (
    (pose.leftKnee.y - pose.leftShoulder.y) /
      (pose.leftHip.y - pose.leftShoulder.y) <
      1.5 &&
    pose.leftKnee.score > 0.85
  ) {
    return true
  } else return false
}

const rightKneeIsUp = pose => {
  if (
    (pose.rightKnee.y - pose.rightShoulder.y) /
      (pose.rightHip.y - pose.rightShoulder.y) <
      1.5 &&
    pose.rightKnee.score > 0.85
  ) {
    return true
  } else return false
}

const leftArmIsOut = pose => {
  if (
    Math.abs(pose.leftWrist.y - pose.leftShoulder.y) <
      0.25 * pose.leftShoulder.y &&
    Math.abs(pose.leftElbow.y - pose.leftShoulder.y) <
      0.25 * pose.leftShoulder.y
  ) {
    return true
  } else return false
}

const rightArmIsOut = pose => {
  if (
    Math.abs(pose.rightWrist.y - pose.rightShoulder.y) <
      0.25 * pose.rightShoulder.y &&
    Math.abs(pose.rightElbow.y - pose.rightShoulder.y) <
      0.25 * pose.rightShoulder.y
  ) {
    // console.log('right arm OUT')
    return true
  } else return false
}

const leftArmIsUp = pose => {
  if (
    (pose.leftShoulder.y - pose.leftWrist.y) /
      (pose.leftHip.y - pose.leftShoulder.y) >
    0.7
  ) {
    return true
  } else return false
}

const rightArmIsUp = pose => {
  if (
    (pose.rightShoulder.y - pose.rightWrist.y) /
      (pose.rightHip.y - pose.rightShoulder.y) >
    0.7
  ) {
    return true
  } else return false
}

const wristsAreTogether = pose => {
  if (
    1.25 * pose.leftShoulder.x - pose.rightShoulder.x >
    pose.leftWrist.x - pose.rightWrist.x
  ) {
    return true
  } else return false
}

const isI = pose => {
  if (leftArmIsUp(pose) && rightArmIsUp(pose) && wristsAreTogether(pose))
    return 'I'
}

const isT = pose => {
  if (leftArmIsOut(pose) && rightArmIsOut(pose)) return 'T'
}

const isJ = pose => {
  if (leftArmIsOut(pose) && rightArmIsUp(pose)) return 'J'
}

const isL = pose => {
  if (rightArmIsOut(pose) && leftArmIsUp(pose)) return 'L'
}

export const getShape = rawPose => {
  const pose = getObj(rawPose)
  if (
    pose.leftHip.score < 0.9 ||
    pose.rightHip.score < 0.9 ||
    pose.rightWrist.score < 0.7 ||
    pose.leftWrist.score < 0.7
  ) {
    return undefined
  }
  return isI(pose) || isT(pose) || isJ(pose) || isL(pose)
}

export const movementPose = pose => {
  let nosePose = Math.floor(pose.nose.x)
  let movement = []

  while (movement.length < 20) {
    movement.push(nosePose)
  }
  let moveReduce = movement.reduce((accu, curr) => {
    return (accu + curr) / movement.length * 10
  }, 0)

  if (moveReduce > 370 && moveReduce < 600) {
    return 'Move Left'
  }

  if (moveReduce > 50 && moveReduce < 270) {
    return 'Move Right'
  }
}

export const getPose = rawPose => {
  const pose = getObj(rawPose)

  return movementPose(pose)
}

export const checkRotation = (rawPose, prevKnee) => {
  const pose = getObj(rawPose)
  if (prevKnee !== 'right' && rightKneeIsUp(pose)) {
    return {rotate: true, knee: 'right'}
  } else if (prevKnee !== 'left' && leftKneeIsUp(pose)) {
    return {rotate: true, knee: 'left'}
  } else return {rotate: false}
}

export const checkPosition = rawPose => {
  const pose = getObj(rawPose)
  const nose = pose.nose.x
  const buffer = 70
  const screenWidth = 640
  if (nose <= buffer) return 9
  else if (nose >= screenWidth - buffer) return 0
  else return Math.ceil(9 - (nose - buffer) / 50)
}
