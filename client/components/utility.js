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
      (pose.rightHip.y - pose.rightShoulder.y) <
      1.5 &&
    pose.leftKnee.score > 0.85
  ) {
    return true
  } else return false
}

const rightKneeIsUp = pose => {
  if (
    (pose.rightKnee.y - pose.rightShoulder.y) /
      (pose.leftHip.y - pose.leftShoulder.y) <
      1.5 &&
    pose.rightKnee.score > 0.85
  ) {
    return true
  } else return false
}

const rightWristIsPerpendicular = pose => {
  // console.log('right Elbow', pose.rightElbow.y, pose.rightElbow.score)
  // console.log('right Shoulder', pose.rightShoulder.y, pose.rightShoulder.score)
  // console.log('right Wrist', pose.rightWrist.y, pose.rightWrist.score)
  if (
    (pose.rightElbow.y / pose.rightShoulder.y > 0.95 ||
      pose.rightElbow.y / pose.rightShoulder.y < 1.05) &&
    pose.rightWrist.y < pose.rightElbow.y
  ) {
    console.log('right wrist was perpendicular')
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

// const isS = pose => {
//   if (leftArmIsUp(pose) && leftKneeIsUp(pose)) return 'S'
// }

// const isZ = pose => {
//   if (rightArmIsUp(pose) && rightKneeIsUp(pose)) return 'Z'
// }

export const getShape = rawPose => {
  const pose = getObj(rawPose)
  if (
    (pose.leftHip.score < 0.9 && pose.rightHip.score < 0.9) ||
    pose.rightWrist.score < 0.7 ||
    pose.leftWrist.score < 0.7
  ) {
    return undefined
  }
  return (
    isI(pose) || isT(pose) || isJ(pose) || isL(pose)
    //  || isS(pose) || isZ(pose)
  )
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

const getHitboxes = rotations => {
  const hitboxRanges = rotations.map((el, idx, arr) => {
    const boxStart = (480 + idx * 440) / arr.length
    return [boxStart, boxStart + 100]
  })
  return hitboxRanges
}

const leftHandIsOnHitbox = (pose, range) => {
  const leftWristIsUp = pose.leftWrist.y < 150 && pose.leftWrist.score > 0.9
  const leftWristIsInRange =
    pose.leftWrist.x > range[0] && pose.leftWrist.x < range[1]
  if (leftWristIsUp && leftWristIsInRange) return true
  else return false
}

const rightHandIsOnHitbox = (pose, range) => {
  const rightWristIsUp = pose.rightWrist.y < 150 && pose.rightWrist.score > 0.9
  const rightWristIsInRange =
    pose.rightWrist.x > range[0] && pose.rightWrist.x < range[1]
  if (rightWristIsUp && rightWristIsInRange) return true
  else return false
}

//This is the original function (with knee-raises to rotate)

// export const checkRotation = (rawPose, prevKnee) => {
//   const pose = getObj(rawPose)
//   if (rightWristIsPerpendicular(pose)) {
//     return {rotate: true, knee: 'right'}
//   } else if (prevKnee !== 'left' && leftKneeIsUp(pose)) {
//     return {rotate: true, knee: 'left'}
//   } else return {rotate: false}
// }

// This function attempts to use a 'target' pose
export const checkRotation = (rawPose, rotations) => {
  const pose = getObj(rawPose)
  const ranges = getHitboxes(rotations)
  for (let i = 0; i < ranges.length; i++) {
    if (
      leftHandIsOnHitbox(pose, ranges[i]) ||
      rightHandIsOnHitbox(pose, ranges[i])
    ) {
      return rotations.length - 1 - i
    }
  }
  return undefined
  // const shoulderBreadth = pose.leftShoulder.x - pose.rightShoulder.x
  // const wristExtension = pose.rightShoulder.x - pose.rightWrist.x
  // if (pose.rightWrist.y > 1.2 * pose.rightShoulder) return 0
  // if (wristExtension < 0.5 * shoulderBreadth) return 0
  // else if (wristExtension < 0.8 * shoulderBreadth) return 1
  // else if (wristExtension < 1.1 * shoulderBreadth) return 2
  // else return 3
}

export const checkPosition = rawPose => {
  const pose = getObj(rawPose)
  const nose = pose.nose.x
  const buffer = 150
  const screenWidth = 640
  const columnWidth = (screenWidth - buffer * 2) / 10
  if (nose <= buffer) return 9
  else if (nose >= screenWidth - buffer) return 0
  else return Math.ceil(9 - (nose - buffer) / columnWidth)
}
