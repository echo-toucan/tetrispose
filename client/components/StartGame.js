import React from 'react'
import Camera from './camera'
import StartPreviewShape from './StartPreviewShape'
import {Button, Grid} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import Instructions from './instructions'
import {UserShape} from '.'

const StartGame = () => {
  return (
    <Grid rows={3} padded>
      <Grid.Row>
        <Button primary size="huge" as={Link} to="/gamehome">
          Start Game
        </Button>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={10}>
          <Camera />
        </Grid.Column>
        <Grid.Column width={6}>
          <StartPreviewShape />
          <UserShape />
        </Grid.Column>
        <Instructions />
      </Grid.Row>
    </Grid>
  )
}

export default StartGame
