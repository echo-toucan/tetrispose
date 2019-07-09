import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Segment} from 'semantic-ui-react'

class Score extends Component {
  render() {
    return (
      <div>
        <Segment>
          <h2>Score: {this.props.score}</h2>
        </Segment>
        <Segment>
          <h2>Rows: {this.props.rows}</h2>
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  score: state.gameScore,
  rows: state.updateRowCount
})

export default connect(mapStateToProps)(Score)
