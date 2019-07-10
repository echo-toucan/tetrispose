import React from 'react'
import {connect} from 'react-redux'
import {Image, Message, Segment} from 'semantic-ui-react'

const SuccessMessage = props => {
  return (
    <div>
      {props.shapeAchieved ? (
        <Segment>
          <Message
            header="😀 YOU GOT IT!"
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
          <Message header="Out of time!" color="red" size="big" />
        </Segment>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  shapeAchieved: state.currentShape.achieved
})

export default connect(mapStateToProps)(SuccessMessage)
