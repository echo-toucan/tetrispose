import React, {Component} from 'react'
import * as posenet from '@tensorflow-models/posenet'
import {connect} from 'react-redux'
import {getShape} from './utility'
import {Container} from 'semantic-ui-react'
import {shapeAchieved, setUserShape} from '../store/currentShape'

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
    console.log('pose', pose)

    const currentShape = getShape(pose)

    this.props.setUserShape(currentShape)

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
  userShape: state.userShape
})

const mapDispatchToProps = dispatch => ({
  shapeAchieved: () => dispatch(shapeAchieved()),
  setUserShape: shape => dispatch(setUserShape(shape))
})

export default connect(mapStateToProps, mapDispatchToProps)(Camera)
