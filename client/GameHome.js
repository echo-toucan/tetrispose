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
      <Grid container columns={2} padded>
        <GridColumn floated="left" width={10}>
          {/* <Segment>
            <Timer />
          </Segment> */}
          <Segment>
            <Camera />
          </Segment>
          <Segment color="orange" inverted>
            <CurrentShape />
          </Segment>
          <Segment color="blue" inverted>
            <PreviewShape />
          </Segment>
        </GridColumn>

        <GridColumn floated="right" width={6}>
          <Segment color="green" inverted>
            <GameBoard />
          </Segment>
        </GridColumn>
      </Grid>
    )
  }
}

export default GameHome
