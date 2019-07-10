import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Segment, Label, Header} from 'semantic-ui-react'

class Score extends Component {
  render() {
    return (
      <div>
        <Segment>
          <Label as="a" color="orange" ribbon>
            <Header as="h2">Score: {this.props.score}</Header>
          </Label>
        </Segment>
        <Segment>
          <Label as="a" color="purple" ribbon>
            <Header as="h2">Rows: {this.props.rows}</Header>
          </Label>
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  score: state.gameScore,
  rows: state.rowScore
})

export default connect(mapStateToProps)(Score)
