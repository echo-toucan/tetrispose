import React, {Component} from 'react'
import * as posenet from '@tensorflow-models/posenet'
import {connect} from 'react-redux'
import {isI, isT} from './utility'
import {Header, Segment} from 'semantic-ui-react'
import {shapeAchieved} from '../store/currentShape'

class Camera extends Component {
  constructor() {
    super()
    this.state = {
      activeCamera: true,
      currentShape: ''
    }
    this.getVideo = this.getVideo.bind(this)
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
    let pose = await this.posenet.estimateSinglePose(this.video, {
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
    const hipRightScore = pose.keypoints[12].score
    const hipLeftScore = pose.keypoints[11].score
    let currentShape =
      isI(
        shoulderLeftY,
        wristLeftY,
        hipLeftY,
        shoulderRightY,
        wristRightY,
        hipRightY,
        hipRightScore,
        hipLeftScore
      ) ||
      isT(
        shoulderLeftY,
        wristLeftY,
        elbowLeftY,
        shoulderRightY,
        wristRightY,
        elbowRightY,
        hipRightScore,
        hipLeftScore
        // wristLeftX,
        // elbowLeftX,
        // wristRightX,
        // elbowRightX
      )

    // console.log(currentShape)

    this.setState({currentShape})

    if (
      this.props.currentShape &&
      this.props.currentShape === this.state.currentShape
    ) {
      this.props.shapeAchieved()
    }
    this.detectPose()
  }

  getVideo(element) {
    this.video = element
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
        <Segment>
          {this.state.currentShape ? (
            <span>
              <img width="10%" src={`/assets/${this.state.currentShape}.png`} />
            </span>
          ) : (
            <Header size="large" color="red">
              CANNOT RECOGNIZE MOVEMENT
            </Header>
          )}
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentShape: state.currentShape.name
})

const mapDispatchToProps = dispatch => ({
  shapeAchieved: () => dispatch(shapeAchieved())
})

export default connect(mapStateToProps, mapDispatchToProps)(Camera)
