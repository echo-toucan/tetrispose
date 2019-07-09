import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Icon, Label} from 'semantic-ui-react'
import {updateScore} from '../store'

class Score extends Component {
  render() {
    return (
      <div>
        <Label size="massive">
          <Icon size="big" name="game" /> {this.props.score}
        </Label>
      </div>
    )
  }
}

const mapStateToProps = state => ({score: state.gameScore})

export default connect(mapStateToProps)(Score)
