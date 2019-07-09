import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Icon, Label} from 'semantic-ui-react'
import {updateScore} from '../store'

class Score extends Component {
  constructor() {
    super()
    this.state = {
      score: 0
    }
  }

  componentDidMount() {}

  increaseScore() {}
  render() {
    return (
      <div>
        <Label size="massive">
          <Icon size="big" name="game" /> 0000
        </Label>
      </div>
    )
  }
}

const mapStateToProps = state => ({score: state.score})

const mapDispatchToProps = dispatch => ({
  updateScore: () => dispatch(updateScore())
})

export default connect(mapStateToProps, mapDispatchToProps)(Score)
