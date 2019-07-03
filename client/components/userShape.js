import React, {Component} from 'react'
import {connect} from 'react-redux'
import {shapeAchieved} from '../store/currentShape'

class UserShape extends Component {
  render() {
    return (
      <div>
        <h1>Your pose is</h1>
        {this.props.userShape ? (
          <span>
            <img
              className="checkmark"
              src={`/assets/${this.props.userShape}.png`}
            />
          </span>
        ) : (
          <h1>not recognized</h1>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userShape: state.userShape,
  gotIt: state.currentShape.achieved
})

// const mapDispatchToProps = dispatch => ({
//   shapeAchieved: () => dispatch(shapeAchieved())
// })

export default connect(mapStateToProps, null)(UserShape)
