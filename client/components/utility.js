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
  // console.log(
  //   (pose.rightShoulder.y - pose.rightWrist.y) /
  //     (pose.rightHip.y - pose.rightShoulder.y)
  // )
  if (
    (pose.rightShoulder.y - pose.rightWrist.y) /
      (pose.rightHip.y - pose.rightShoulder.y) >
    0.7
  ) {
    console.log('right arm UP')
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
  // console.log(pose.rightWrist.score)
  // console.log('nose x', pose.nose.x)
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

const moveLeftPose = pose => {
  // const pose = getObj(rawPose)

  let nosePose = pose.nose.x
  console.log(nosePose)
  let moveLeft = []
  console.log(moveLeft)
  while (moveLeft.length < 10) {
    moveLeft.push(nosePose)
  }
  // let leftReduce = moveLeft.reduce((accu, curr) => {
  //   return (accu + curr) / moveLeft.length
  // }, 0)
  // console.log(leftReduce)
  return moveLeft
}

export const getPose = rawPose => {
  const pose = getObj(rawPose)
  // console.log(pose.rightWrist.score)
  console.log('nose x', pose.nose.x)

  return moveLeftPose(pose)
}
