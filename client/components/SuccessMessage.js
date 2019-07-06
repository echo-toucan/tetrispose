import React from 'react'
import {connect} from 'react-redux'
import {Image} from 'semantic-ui-react'

const SuccessMessage = props => {
  return (
    <div>
      {props.shapeAchieved ? (
        <div>
          <h1>YEAH! YOU GOT IT!</h1>
          <Image size="small" className="checkmark" src="/assets/check.png" />
        </div>
      ) : (
        <div>
          <h1>Ops... Out of time! Please do better on next upcoming shape.</h1>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  shapeAchieved: state.currentShape.achieved
})

export default connect(mapStateToProps)(SuccessMessage)
