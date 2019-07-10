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
      rotationsCounter: 0
    }
    this.getVideo = this.getVideo.bind(this)
    this.getCanvas = this.getCanvas.bind(this)
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
      this.detectPose()
    }
  }

  async detectPose() {
    let pose = await this.posenet.estimateSinglePose(this.video, {
      flipHorizontal: false
    })

    if (this.props.phase === 1) {
      if (this.state.canvasIsPainted) {
        this.setState({canvasIsPainted: false})
      }
      this.clearCanvas()
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
      if (!this.state.canvasIsPainted) {
        this.drawRotations(this.props.currentShape.rotations)
        this.setState({canvasIsPainted: true})
      }

      const column = checkPosition(pose)
      this.props.move(column)

      const rotations = this.props.currentShape.rotations
      const targetRotation = checkRotation(pose, rotations)
      if (targetRotation !== undefined) {
        this.props.rotate(rotations, targetRotation)
      }
    }

    this.setState(prevState => ({
      rotationsCounter: prevState.rotationsCounter + 1
    }))

    setTimeout(() => {
      this.detectPose()
    }, 100)
  }

  drawRotations(rotations) {
    const canvas = this.canvas.getContext('2d')
    rotations.forEach((rotation, idx, arr) => {
      const drawPos = (480 + idx * 440) / arr.length
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
    return (
      <div className="camera-container">
        {this.state.cameraIsLoading ? (
          <Segment className="camera-loader">
            <Dimmer active>
              <Loader indeterminate size="huge">
                Camera Loading
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
  gameLoaded: () => dispatch(gameLoaded()),
  loadGame: () => dispatch(loadGame())
})

export default connect(mapStateToProps, mapDispatchToProps)(Camera)
