import React, {Component} from 'react'
import {connect} from 'react-redux'
import {startGame, resetGame} from '../store'
import {Button} from 'semantic-ui-react'

class GamePanel extends Component {
  render() {
    return (
      <div>
        <Button
          primary
          size="huge"
          onClick={() => this.props.startGame()}
          disabled={!this.props.gameLoaded}
        >
          Start Game
        </Button>
        <Button
          primary
          size="huge"
          onClick={() => this.props.resetGame()}
          disabled={!this.props.gameStarted}
        >
          New Game
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  gameLoaded: state.gameState.loaded,
  gameStarted: state.gameState.started
})

const mapDispatchToProps = dispatch => ({
  startGame: () => dispatch(startGame()),
  resetGame: () => dispatch(resetGame())
})

export default connect(mapStateToProps, mapDispatchToProps)(GamePanel)
