import React, {Component} from 'react'
import {connect} from 'react-redux'
import {shapeAchieved} from '../store/currentShape'

class UserShape extends Component {
  constructor() {
    super()
  }
  render() {
    console.log(this.props.gotIt)
    return (
      <div>
        {this.props.gotIt ? (
          <div>
            <h1>YOU GOT IT!</h1>
            <img className="preview-image" src="/assets/check.png" />
          </div>
        ) : (
          <div>
            <h1>Your pose is</h1>
            {this.props.userShape ? (
              <span>
                <img
                  className="preview-image"
                  src={`/assets/${this.props.userShape}.png`}
                />
              </span>
            ) : (
              <h1>not recognized</h1>
            )}
          </div>
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
