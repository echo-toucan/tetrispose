import React, {Component} from 'react'
import {Grid, GridColumn, Segment} from 'semantic-ui-react'
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
      <Grid container columns={2}>
        <GridColumn floated="left" width={10}>
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

        <GridColumn floated="right" width={6}>
          <Segment color="blue" inverted>
            <PreviewShape />
          </Segment>
          <Segment color="green" inverted>
            <GameBoard />
          </Segment>
        </GridColumn>
      </Grid>
    )
  }
}

export default GameHome
