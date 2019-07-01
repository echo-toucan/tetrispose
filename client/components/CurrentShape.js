// import {Menu, Container} from 'semantic-ui-react'
import React, {Component} from 'react'
import {updateShapes, shapeAchieved, previewShape} from '../store/index'
import {updateCurrent} from '../store/currentShape'
import {connect} from 'react-redux'

class CurrentShape extends Component {
  constructor() {
    super()
    this.state = {
      target: ''
    }
  }
  render() {
    return (
      <div>
        <h1>Target</h1>
        <div>{/* {this.props.previewShape} */}</div>
        <div>
          {this.props.previewShape.slice(0, 1).map((shape, idx) => {
            return (
              <div key={idx}>
                <img
                  className="preview-image"
                  src={`/assets/${shape.name}.png`}
                />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  previewShape: state.previewShape
})

const mapDispatchToProps = dispatch => ({
  shapeAchieved: () => dispatch(shapeAchieved()),
  updateShapes: () => dispatch(updateShapes()),
  updateCurrent: shape => dispatch(updateCurrent(shape))
})

export default connect(mapStateToProps, mapDispatchToProps)(CurrentShape)
