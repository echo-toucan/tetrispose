// import {Menu, Container} from 'semantic-ui-react'
import React, {Component} from 'react'
import {shapeAchieved} from '../store/index'
import {connect} from 'react-redux'

class CurrentShape extends Component {
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

export default connect(mapStateToProps)(CurrentShape)
