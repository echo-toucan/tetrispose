import React from 'react'
import {connect} from 'react-redux'

const SuccessMessage = props => {
  return (
    <div>
      {props.shapeAchieved ? (
        <div>
          <h1>YOU GOT IT!</h1>
          <img className="preview-image" src="/assets/check.png" />
        </div>
      ) : (
        <div>
          <h1>Out of time!</h1>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  shapeAchieved: state.currentShape.achieved
})

export default connect(mapStateToProps)(SuccessMessage)
