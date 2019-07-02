import React, {Component} from 'react'
import {connect} from 'react-redux'

class UserShape extends Component {
  constructor() {
    super()
  }
  render() {
    return (
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
    )
  }
}

const mapStateToProps = state => ({
  userShape: state.userShape
})

export default connect(mapStateToProps)(UserShape)
