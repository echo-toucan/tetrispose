// import {Menu, Container} from 'semantic-ui-react'
import React, {Component} from 'react'
import Grid from './Grid'

class CurrentShape extends Component {
  render() {
    return (
      <div>
        <h1>Display Gameboard shape</h1>
        <Grid />
      </div>
    )
  }
}

export default CurrentShape
