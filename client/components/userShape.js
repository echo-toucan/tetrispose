import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {shapeAchieved} from '../store/currentShape'
import {Image, Icon, Segment, Message} from 'semantic-ui-react'

class UserShape extends Component {
  render() {
    return (
      <div>
        {this.props.userShape ? (
          <Segment>
            <Image
              size="small"
              className="checkmark"
              src={`/assets/${this.props.userShape}.png`}
            />
          </Segment>
        ) : (
          <Segment>
            <Message
              header="Please match your pose of upcoming shape!"
              size="big"
            />
            <Icon
              className="animated infinite wobble"
              name="hand point left"
              size="huge"
            />
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
