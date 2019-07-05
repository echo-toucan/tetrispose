import React, {Component} from 'react'
import * as posenet from '@tensorflow-models/posenet'
import {connect} from 'react-redux'
import {getShape, getPose} from './utility'
import {
  shapeAchieved,
  setUserShape,
  setUserMovement
} from '../store/currentShape'

class Camera extends Component {
  constructor() {
    super()
    this.state = {
      activeCamera: true
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
      console.log('loading posenet...')
      this.posenet = await posenet.load({
        architecture: 'ResNet50',
        outputStride: 32,
        inputResolution: 193,
        quantBytes: 1
      })
      if (this.posenet) console.log('posenet loaded!')
      if (this.posenet) this.detectPose()
    } catch (err) {
      console.error(err)
    }
  }

  async detectPose() {
    let pose = await this.posenet.estimateSinglePose(this.video, {
      flipHorizontal: false
    })

    const currentShape = getShape(pose)
    const userMovement = getPose(pose)

    this.props.setUserShape(currentShape)
    this.props.setUserMovement(userMovement)

    if (
      this.props.currentShape &&
      this.props.currentShape === this.props.userShape
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
      <div className="camera-position">
        {this.state.activeCamera ? (
          <video width="640" height="480" autoPlay={true} ref={this.getVideo} />
        ) : (
          <h1>......</h1>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentShape: state.currentShape.shape.name,
  userShape: state.userShape,
  userMovement: state.userMovement
})

const mapDispatchToProps = dispatch => ({
  shapeAchieved: () => dispatch(shapeAchieved()),
  setUserShape: shape => dispatch(setUserShape(shape)),
  setUserMovement: pose => dispatch(setUserMovement(pose))
})

export default connect(mapStateToProps, mapDispatchToProps)(Camera)
