import React, {Component} from 'react'
import {connect} from 'react-redux'

import ReactCountdownClock from 'react-countdown-clock'

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
          console.log("time's up")
        }}
      />
    )
  }
}

const mapStateToProps = state => ({
  currentShape: state.currentShape
})

export default connect(mapStateToProps)(Countdown)
