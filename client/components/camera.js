import React, {Component} from 'react'
import * as posenet from '@tensorflow-models/posenet'
import {gameItems} from './icons'
import {Header} from 'semantic-ui-react'

export default class Camera extends Component {
  constructor() {
    super()
    this.state = {
      activeCamera: true,
      isLoading: false,
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

    const waistToShoulderL =
      pose.keypoints[11].position.y - pose.keypoints[5].position.y
    const waistToShoulderR =
      pose.keypoints[12].position.y - pose.keypoints[6].position.y
    const shoulderToWristL =
      pose.keypoints[5].position.y - pose.keypoints[9].position.y
    const shoulderToWristR =
      pose.keypoints[6].position.y - pose.keypoints[10].position.y

    const isAnI =
      shoulderToWristL / waistToShoulderL > 0.7 &&
      shoulderToWristR / waistToShoulderR > 0.7
    this.setState({isAnI})

    this.detectPose()
  }

  getVideo(element) {
    this.video = element
  }

  startTracking() {
    this.setState({isLoading: true})
  }

  render() {
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
        {this.state.isAnI ? (
          <span>
            <img width="5%" src="/assets/Line.png" />
          </span>
        ) : this.state.isAT ? (
          <span>
            <img width="5%" src="/assets/T-shape.svg" />
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
