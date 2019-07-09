import React from 'react'
import {connect} from 'react-redux'
import Grid from './Grid'
import GridPlaceholder from './GridPlaceholder'

const GameBoard = ({gameStarted, gamePaused}) => {
  return (
    <div>{gameStarted && !gamePaused ? <Grid /> : <GridPlaceholder />}</div>
  )
  // return <div>{<Grid />}</div>
}

const mapStateToProps = state => ({
  gameStarted: state.gameState.started,
  gamePaused: state.gameState.paused
})

export default connect(mapStateToProps)(GameBoard)
