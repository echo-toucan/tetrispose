import React, {Component} from 'react'
import {connect} from 'react-redux'
import {startGame, resetGame, pauseGame} from '../store'
import {Button, Container} from 'semantic-ui-react'

class GamePanel extends Component {
  render() {
    return (
      <Container>
        {this.props.gameStarted ? (
          <Button
            primary
            size="huge"
            onClick={() => this.props.resetGame()}
            disabled={!this.props.gameStarted}
          >
            New Game
          </Button>
        ) : (
          <Button
            primary
            size="huge"
            onClick={() => this.props.startGame()}
            disabled={!this.props.gameLoaded}
          >
            Start Game
          </Button>
        )}
        {/* <Button
          primary
          size="huge"
          onClick={() => this.props.pauseGame()}
          disabled={!this.props.gameStarted}
        >
          {this.props.gamePaused ? 'Resume' : 'Pause'}
        </Button> */}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  gameLoaded: state.gameState.loaded,
  gameStarted: state.gameState.started,
  gamePaused: state.gameState.paused
})

const mapDispatchToProps = dispatch => ({
  startGame: () => dispatch(startGame()),
  resetGame: () => dispatch(resetGame()),
  pauseGame: () => dispatch(pauseGame())
})

export default connect(mapStateToProps, mapDispatchToProps)(GamePanel)
