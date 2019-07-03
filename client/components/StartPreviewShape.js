import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getShape} from './utility'
import {setFirstShape} from '../store'

class StartPreviewShape extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     currentShape: 'Test'
  //   }
  // }

  componentDidMount() {
    this.props.setFirstShape()
  }

  render() {
    const shapes = this.props.shapes
    return (
      <div>
        {this.props.shapeAchieved ? (
          <div>
            {shapes.map((shape, idx) => {
              return (
                <div key={idx} className="preview-image">
                  <Image src={`/assets/${shape.name}.png`} />
                </div>
              )
            })}
          </div>
        ) : (
          <div>
            <h1>TEST YOUR POSE</h1>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  shapeAchieved: state.currentShape.achieved,
  shapes: state.previewShape
})

const mapDispatchToProps = dispatch => ({
  setFirstShape: () => dispatch(setFirstShape())
})

export default connect(mapStateToProps, mapDispatchToProps)(StartPreviewShape)
