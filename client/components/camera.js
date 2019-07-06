import React, {Component} from 'react'
import * as posenet from '@tensorflow-models/posenet'
import {connect} from 'react-redux'
import {movedLeft, movedRight, rotated, changePhase} from '../store/game'
import {getShape, getPose, checkRotation} from './utility'
import {shapeAchieved, setUserShape} from '../store/currentShape'
import {Dimmer, Loader, Image, Segment} from 'semantic-ui-react'

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
    try {
      await this.setupCamera()
    } catch (error) {
      throw new Error(
        'This browser does not support video capture, or this device does not have a camera'
      )
    }

    try {
      this.posenetModel = await posenet.load()
    } catch (error) {
      throw new Error('Posenet failed to load')
    } finally {
      setTimeout(() => {
        this.setState({activeCamera: false})
      }, 100)
    }

    this.detectPose()
  }

  async setupCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        'Browser API navigator.mediaDevices.getUserMedia not available'
      )
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: 'user',
          width: 640,
          height: 480
        }
      })
      this.video.srcObject = stream
    } catch (err) {
      console.error(err)
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
      if (userMovement === 'Move Left') {
        this.props.moveLeft()
      }

      if (userMovement === 'Move Right') {
        this.props.moveRight()
      }

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
    }

    this.detectPose()
  }

  getVideo(element) {
    this.video = element
  }

  render() {
    const activeCamera = this.state.activeCamera ? (
      <Segment>
        <Dimmer active>
          <Loader indeterminate>Camera Loading</Loader>
        </Dimmer>
        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
      </Segment>
    ) : null
    return (
      <div className="camera-position">
        <div>{activeCamera}</div>
        <video width="640" height="480" autoPlay={true} ref={this.getVideo} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentShape: state.currentShape.shape,
  userShape: state.userShape,
  phase: state.phase,
  gameBoard: state.gameBoard
})

const mapDispatchToProps = dispatch => ({
  shapeAchieved: () => dispatch(shapeAchieved()),
  setUserShape: shape => dispatch(setUserShape(shape)),
  changePhase: () => dispatch(changePhase()),
  moveLeft: () => dispatch(movedLeft()),
  moveRight: () => dispatch(movedRight()),
  rotate: (grid, rotations, counter) =>
    dispatch(rotated(grid, rotations, counter))
})

export default connect(mapStateToProps, mapDispatchToProps)(Camera)
