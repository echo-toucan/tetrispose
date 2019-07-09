import React from 'react'
import {connect} from 'react-redux'
import Grid from './Grid'
import GridPlaceholder from './GridPlaceholder'

const GameBoard = ({gameStarted}) => {
  return <div>{gameStarted ? <Grid /> : <GridPlaceholder />}</div>
  // return <div>{<Grid />}</div>
}

const mapStateToProps = state => ({
  currentShape: state.currentShape,
  gameStarted: state.gameState.started
})

export default connect(mapStateToProps)(GameBoard)
