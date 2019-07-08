import React from 'react'
import {connect} from 'react-redux'
import {Image, Message, Segment, Icon} from 'semantic-ui-react'

const SuccessMessage = props => {
  return (
    <div>
      {props.shapeAchieved ? (
        <Segment>
          <Message
            header="YEAH! 😀 YOU GOT IT! 🥳"
            color="green"
            size="big"
            className="animated infinite jello"
          />
          <Image
            centered
            size="small"
            className="checkmark"
            src="/assets/check.png"
          />
        </Segment>
      ) : (
        <Segment>
          <Icon
            name="hand point left"
            size="huge"
            className="animated infinite wobble delay-1s"
          />
          <Message
            header=" 😂 Out of time! Please match your pose of next pattern. 😤"
            color="red"
            size="big"
          />
        </Segment>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  shapeAchieved: state.currentShape.achieved
})

export default connect(mapStateToProps)(SuccessMessage)
