import React, {Component} from 'react'
import {connect} from 'react-redux'
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
            {/* <Message header="Match the shape!" size="small" /> */}
            <Icon
              className="animated bounceInRight"
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

export default connect(mapStateToProps, null)(UserShape)
