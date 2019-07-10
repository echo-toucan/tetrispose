import React, {Component} from 'react'
import {connect} from 'react-redux'

import ReactCountdownClock from 'react-countdown-clock'
import {updateScore} from '../store'

class Countdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seconds: 3
    }
  }

  render() {
    return (
      <ReactCountdownClock
        seconds={this.state.seconds}
        color="teal"
        alpha={0.9}
        size={150}
        showMilliseconds={true}
        onComplete={() => {
          console.log('Time Up!')
          // if (this.props.currentShape.achieved) {
          //   this.props.updateScore(10)
          // } else {
          //   this.props.updateScore(-5)
          // }
        }}
      />
    )
  }
}

const mapStateToProps = state => ({
  currentShape: state.currentShape
})

const mapDispatchToProps = dispatch => ({
  updateScore: score => dispatch(updateScore(score))
})

export default connect(mapStateToProps, mapDispatchToProps)(Countdown)
