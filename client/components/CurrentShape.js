// import {Menu, Container} from 'semantic-ui-react'
import React, {Component} from 'react'
import {setFirstShape, shapeAchieved, previewShape} from '../store/index'
import {updateCurrent} from '../store/currentShape'
import {connect} from 'react-redux'

class CurrentShape extends Component {
  componentDidMount() {
    this.props.setFirstShape()
  }

  render() {
    const shape = this.props.currentShape.shape
    return (
      <div>
        <h1>Target</h1>
        {shape.name ? (
          <img className="preview-image" src={`/assets/${shape.name}.png`} />
        ) : (
          ''
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentShape: state.currentShape
})

const mapDispatchToProps = dispatch => ({
  shapeAchieved: () => dispatch(shapeAchieved()),
  setFirstShape: () => dispatch(setFirstShape())
})

export default connect(mapStateToProps, mapDispatchToProps)(CurrentShape)
