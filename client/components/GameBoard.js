// import {Menu, Container} from 'semantic-ui-react'
import React, {Component} from 'react'
import Grid from './Grid'

class GameBoard extends Component {
  render() {
    return (
      <div>
        <h1>Tetris Gameboard</h1>
        <Grid />
      </div>
    )
  }
}

export default GameBoard
