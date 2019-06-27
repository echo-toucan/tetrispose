import React, {Component} from 'react'
import * as posenet from '@tensorflow-models/posenet'

export default class Camera extends Component {
  constructor() {
    super()
    this.state = {
      activeCamera: true,
      isLoading: false,
      isAnI: false
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
  }

  async componentDidUpdate() {
    const timer = setTimeout(() => {
      this.setState({isLoading: false})
    }, 500)
    const net = await posenet.load()
    const pose = await net.estimateSinglePose(this.video, {
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
        <button type="button" onClick={() => this.startTracking()}>
          Start tracking
        </button>
        {this.state.isAnI ? 'SHAPE: I' : 'not recognized...'}
      </div>
    )
  }
}
