import React, {Component} from 'react'
import * as posenet from '@tensorflow-models/posenet'

import {isI, isT} from './utility'

import {gameItems} from './icons'
import {Header} from 'semantic-ui-react'

export default class Camera extends Component {
  constructor() {
    super()
    this.state = {
      activeCamera: true,
      isLoading: false,
      currentShape: '',
      isAnI: false,
      isAT: false
    }
    this.getVideo = this.getVideo.bind(this)
    this.startTracking = this.startTracking.bind(this)
  }
  async componentDidMount() {
    if (navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({video: true})
        this.video.srcObject = stream
      } catch (err) {
        console.error(err)
      }
    }
    try {
      this.posenet = await posenet.load()
      if (this.posenet) this.detectPose()
    } catch (err) {
      console.error(err)
    }
  }

  async detectPose() {
    const pose = await this.posenet.estimateSinglePose(this.video, {
      flipHorizontal: false
    })

    const shoulderLeftX = pose.keypoints[5].position.x
    const shoulderLeftY = pose.keypoints[5].position.y
    const shoulderRightX = pose.keypoints[6].position.x
    const shoulderRightY = pose.keypoints[6].position.y
    const elbowLeftX = pose.keypoints[7].position.x
    const elbowLeftY = pose.keypoints[7].position.y
    const elbowRightX = pose.keypoints[8].position.x
    const elbowRightY = pose.keypoints[8].position.y
    const wristLeftX = pose.keypoints[9].position.x
    const wristLeftY = pose.keypoints[9].position.y
    const wristRightX = pose.keypoints[10].position.x
    const wristRightY = pose.keypoints[10].position.y
    const hipLeftX = pose.keypoints[11].position.x
    const hipLeftY = pose.keypoints[11].position.y
    const hipRightX = pose.keypoints[12].position.x
    const hipRightY = pose.keypoints[12].position.y

    let currentShape =
      isI(
        shoulderLeftY,
        wristLeftY,
        hipLeftY,
        shoulderRightY,
        wristRightY,
        hipRightY
      ) ||
      isT(
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
      )

    console.log(currentShape)

    if (currentShape) {
      this.setState({currentShape})
    }

    this.detectPose()
  }

  getVideo(element) {
    this.video = element
  }

  startTracking() {
    this.setState({isLoading: true})
  }

  render() {
    let imageSource = ''

    switch (this.state.currentShape) {
      case 'isI':
        imageSource = '/assets/Line.png'
        break
      case 'isT':
        imageSource = '/assets/T-shape.svg'
        break
      default:
        imageSource = ''
    }

    return (
      <div>
        {this.state.activeCamera ? (
          <video
            width="640"
            height="480"
            controls
            autoPlay={true}
            ref={this.getVideo}
          />
        ) : (
          <h1>......</h1>
        )}

        {this.state.currentShape ? (
          <span>
            <img width="5%" src={imageSource} />
          </span>
        ) : (
          <Header size="large" color="red">
            CANNOT RECOGNIZE MOVEMENT
          </Header>
        )}
      </div>
    )
  }
}
