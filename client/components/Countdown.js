import React, {Component} from 'react'
import {connect} from 'react-redux'

import ReactCountdownClock from 'react-countdown-clock'

class Countdown extends Component {
  render() {
    return (
      <ReactCountdownClock
        seconds={3}
        color="teal"
        alpha={0.9}
        size={150}
        showMilliseconds={false}
        onComplete={() => {
          console.log('test')
        }}
      />
    )
  }
}

const mapStateToProps = state => ({
  currentShape: state.currentShape
})

export default connect(mapStateToProps)(Countdown)
