import React, {Component} from 'react'

import {Container} from 'semantic-ui-react'
import {Instructions} from './components'

export default class HomePage extends Component {
  render() {
    return (
        <Container>
          <Instructions />
        </Container>
    )
  }
}
