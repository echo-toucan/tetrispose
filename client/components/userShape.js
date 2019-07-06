import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {shapeAchieved} from '../store/currentShape'
import {Image, Icon, Segment} from 'semantic-ui-react'

class UserShape extends Component {
  render() {
    return (
      <div>
        {/* <h1>Please match your pose of upcoming shape!</h1> */}
        {this.props.userShape ? (
          <span>
            <Image
              size="small"
              className="checkmark"
              src={`/assets/${this.props.userShape}.png`}
            />
          </span>
        ) : (
          <Segment>
            <h1>Please match your pose of upcoming shape!</h1>
            <Icon name="hand point left" size="huge" />
          </Segment>
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
