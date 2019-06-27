import React, {Component, Fragment} from 'react'
import {Grid, GridColumn, Segment, Container} from 'semantic-ui-react'
import {
  Camera,
  Timer,
  PreviewShape,
  GameBoard,
  CurrentShape
} from './components'

class GameHome extends Component {
  render() {
    return (
      <Grid>
        <GridColumn width={8}>
          <Segment>
            <Timer />
          </Segment>
          <Segment>
            <Camera />
          </Segment>
          <Segment>
            <CurrentShape />
          </Segment>
        </GridColumn>

        <GridColumn width={6}>
          <Segment>
            <PreviewShape />
          </Segment>
          <Segment>
            <GameBoard />
          </Segment>
        </GridColumn>
      </Grid>
    )
  }
}

export default GameHome
