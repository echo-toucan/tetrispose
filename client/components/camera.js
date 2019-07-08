import React, {Component} from 'react'
import * as posenet from '@tensorflow-models/posenet'
import {connect} from 'react-redux'
import {
  rotated,
  changePhase,
  moved,
  shapeAchieved,
  setUserShape,
  gameLoaded,
  loadGame
} from '../store'
import {getShape, checkRotation, checkPosition} from './utility'
import {Dimmer, Loader, Image, Segment} from 'semantic-ui-react'

class Camera extends Component {
  constructor() {
    super()
    this.state = {
      prevKnee: '',
      cameraIsLoading: true,
      rotationsCounter: 0
    }
    this.getVideo = this.getVideo.bind(this)
  }

  async componentDidMount() {
    try {
      this.props.loadGame()
      console.log('loading posenet...')
      this.posenet = await posenet.load({
        architecture: 'ResNet50',
        outputStride: 32,
        inputResolution: 193,
        quantBytes: 1
      })
      if (this.posenet) console.log('posenet loaded!')
    } catch (err) {
      console.error(err)
      throw new Error('Posenet failed to load')
    } finally {
      await this.setupCamera()
    }
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
      this.setState({cameraIsLoading: false})
      this.video.srcObject = stream
    } catch (err) {
      console.error(err)
    } finally {
      this.props.gameLoaded()
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
      const column = checkPosition(pose)
      this.props.move(column)

      const rotation = checkRotation(pose, this.state.prevKnee)
      if (rotation.rotate) {
        this.props.rotate(
          this.props.currentShape.rotations,
          this.state.rotationsCounter
        )
        // this.setState(prevState => ({
        //   rotationsCounter: prevState.rotationsCounter + 1,
        //   prevKnee: rotation.knee
        // }))
      }
    }

    this.detectPose()
  }

  getVideo(element) {
    this.video = element
  }

  render() {
    return (
      <div>
        {this.state.cameraIsLoading ? (
          <Segment>
            <Dimmer active>
              <Loader indeterminate>Camera Loading</Loader>
            </Dimmer>
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Segment>
        ) : (
          <div className="camera-position">
            <video
              width="640"
              height="480"
              autoPlay={true}
              ref={this.getVideo}
            />
          </div>
        )}
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
  rotate: (grid, rotations, counter) =>
    dispatch(rotated(grid, rotations, counter)),
  move: column => dispatch(moved(column)),
  gameLoaded: () => dispatch(gameLoaded()),
  loadGame: () => dispatch(loadGame())
})

export default connect(mapStateToProps, mapDispatchToProps)(Camera)
