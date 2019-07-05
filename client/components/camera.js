import React, {Component} from 'react'
import * as posenet from '@tensorflow-models/posenet'
import {connect} from 'react-redux'
import {changePhase} from '../store/game'
import {movedLeft, movedRight, rotated} from '../store/game'

import {getShape, getPose, checkRotation} from './utility'
import {
  shapeAchieved,
  setUserShape,
  setUserMovement
} from '../store/currentShape'

class Camera extends Component {
  constructor() {
    super()
    this.state = {
      prevKnee: '',
      activeCamera: true,
      rotationsCounter: 0
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

    if (this.props.phase === 1) {
      const currentShape = getShape(pose)

      this.props.setUserShape(currentShape)

      if (
        this.props.currentShape.name &&
        this.props.currentShape.name === this.props.userShape
      ) {
        this.props.shapeAchieved()
      }
    }
    if (this.props.phase === 2) {
      const userMovement = getPose(pose)
      const rotation = checkRotation(pose, this.state.prevKnee)
      if (rotation.rotate) {
        this.props.rotate(
          this.props.currentShape.rotations,
          this.state.rotationsCounter
        )
        this.setState(prevState => ({
          rotationsCounter: prevState.rotationsCounter + 1,
          prevKnee: rotation.knee
        }))
      }
      // this.props.setUserMovement(userMovement)
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
  currentShape: state.currentShape.shape,
  userShape: state.userShape,
  phase: state.phase,
  userMovement: state.userMovement,
  gameBoard: state.gameBoard
})

const mapDispatchToProps = dispatch => ({
  shapeAchieved: () => dispatch(shapeAchieved()),
  setUserShape: shape => dispatch(setUserShape(shape)),
  changePhase: () => dispatch(changePhase()),
  setUserMovement: pose => dispatch(setUserMovement(pose)),
  rotate: (grid, rotations, counter) =>
    dispatch(rotated(grid, rotations, counter))
})

export default connect(mapStateToProps, mapDispatchToProps)(Camera)
