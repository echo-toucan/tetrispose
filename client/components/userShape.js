import React, {Component} from 'react'
import {connect} from 'react-redux'

class UserShape extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        {this.props.userShape ? (
          <span>
            <img width="5%" src={`/assets/${this.props.userShape}.png`} />
          </span>
        ) : (
          <h1>CANNOT RECOGNIZE MOVEMENT</h1>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userShape: state.userShape
})

export default connect(mapStateToProps)(UserShape)
