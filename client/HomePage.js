import React, {Component} from 'react'

import {Container} from 'semantic-ui-react'
import StartGame from './components/StartGame'

export default class HomePage extends Component {
  render() {
    return (
      <Container padded className="home-page">
        <StartGame />
      </Container>
    )
  }
}
