import React, {Component} from 'react'

export default class Camera extends Component {
  constructor() {
    super()
    this.state = {
      activeCamera: false
    }
    this.getVideo = this.getVideo.bind(this)
    this.toggleCamera = this.toggleCamera.bind(this)
  }
  componentDidMount() {}
  getVideo(element) {
    this.video = element
  }

  async toggleCamera() {
    this.setState(prevState => {
      return {
        activeCamera: !prevState.activeCamera
      }
    })
    if (navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({video: true})
        this.video.srcObject = stream
      } catch (err) {
        console.error(err)
      }
    }
  }
  render() {
    return (
      <div>
        <button type="button" onClick={this.toggleCamera}>
          Toggle Camera
        </button>
        <h1>Text</h1>
        {this.state.activeCamera ? (
          <video autoPlay={true} ref={this.getVideo} />
        ) : (
          <h1>......</h1>
        )}
      </div>
    )
  }
}
