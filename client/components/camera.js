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
  loadGame,
  setFastDrop
} from '../store'
import {
  getShape,
  checkRotation,
  checkPosition,
  fastDropIsActive
} from './utility'
import {
  Dimmer,
  Loader,
  Image as SemanticImage,
  Segment
} from 'semantic-ui-react'

class Camera extends Component {
  constructor() {
    super()
    this.state = {
      canvasIsPainted: false,
      cameraIsLoading: true,
      posenetIsLoading: true
    }
    this.getVideo = this.getVideo.bind(this)
    this.getCanvas = this.getCanvas.bind(this)
  }

  async componentDidMount() {
    try {
      this.props.loadGame()
      this.posenet = await posenet.load({
        architecture: 'ResNet50',
        outputStride: 32,
        inputResolution: 193,
        quantBytes: 1
      })
      if (this.posenet) this.setState({posenetIsLoading: false})
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
      this.detectPose()
    }
  }

  async detectPose() {
    const {phase} = this.props
    let pose = await this.posenet.estimateSinglePose(this.video, {
      flipHorizontal: false
    })

    if (phase === 1) {
      this.handleShapeCreation(pose)
    }

    if (phase === 2) {
      this.handleShapeManipulation(pose)
    }

    setTimeout(() => {
      this.detectPose()
    }, 100)
  }

  handleShapeCreation(pose) {
    const {currentShape, userShape} = this.props
    if (this.state.canvasIsPainted) {
      this.setState({canvasIsPainted: false})
    }
    this.clearCanvas()
    const currentUserShape = getShape(pose)
    this.props.setUserShape(currentUserShape)

    if (currentShape.name && currentShape.name === userShape) {
      this.props.shapeAchieved()
    }
  }

  handleShapeManipulation(pose) {
    const {currentShape} = this.props
    if (!this.state.canvasIsPainted) {
      this.drawRotations(currentShape.rotations)
      this.setState({canvasIsPainted: true})
    }

    const column = checkPosition(pose)
    this.props.move(column)

    const rotations = currentShape.rotations
    const targetRotation = checkRotation(pose, rotations)
    if (targetRotation !== undefined) {
      this.props.rotate(rotations, targetRotation)
    }

    if (fastDropIsActive(pose)) {
      this.props.fastDrop()
    }
  }

  drawRotations(rotations) {
    const canvas = this.canvas.getContext('2d')

    const screenWidth = 640
    const buffer = screenWidth / 6

    rotations.forEach((rotation, idx, arr) => {
      const segmentWidth = (screenWidth - 2 * buffer) / arr.length
      const drawPos = idx * segmentWidth + (segmentWidth + buffer) / 2

      const img = new Image()
      img.src = `./assets/rotations/${
        this.props.currentShape.name
      }rot${idx}.png`
      img.onload = () => {
        canvas.drawImage(img, drawPos, 20, img.width / 4, img.height / 4)
      }
    })
  }

  clearCanvas() {
    const canvas = this.canvas.getContext('2d')
    canvas.clearRect(0, 0, 640, 480)
  }

  getVideo(element) {
    this.video = element
  }

  getCanvas(element) {
    this.canvas = element
  }

  render() {
    const loadingMessage = this.state.posenetIsLoading
      ? 'Loading PoseNet...'
      : 'Loading Camera...'
    return (
      <div className="camera-container">
        {this.state.cameraIsLoading ? (
          <Segment className="camera-loader">
            <Dimmer active>
              <Loader indeterminate size="huge">
                {loadingMessage}
              </Loader>
            </Dimmer>
            <SemanticImage src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Segment>
        ) : (
          <div className="camera-position">
            <video
              playsInline
              id="webcam"
              width="640"
              height="480"
              autoPlay={true}
              ref={this.getVideo}
            />
            <canvas
              className="canvas"
              width="640"
              height="480"
              ref={this.getCanvas}
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
  fastDrop: () => dispatch(setFastDrop()),
  gameLoaded: () => dispatch(gameLoaded()),
  loadGame: () => dispatch(loadGame())
})

export default connect(mapStateToProps, mapDispatchToProps)(Camera)
