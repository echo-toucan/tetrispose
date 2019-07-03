import React, {Component} from 'react'
import {connect} from 'react-redux'
import Camera from './camera'
import {Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import Instructions from './instructions'

const StartGame = props => {
  return (
    <div>
      <Button size="huge" as={Link} to="/gamehome" primary>
        Start game
      </Button>
      <Camera />
      <Instructions />
    </div>
  )
}

export default StartGame
