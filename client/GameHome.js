import React, {Component} from 'react'
import {Grid, GridRow, GridColumn, Segment} from 'semantic-ui-react'
import {
  Camera,
  PreviewShape,
  GameBoard,
  CurrentShape,
  UserShape
} from './components'

class GameHome extends Component {
  render() {
    return (
      <Grid container columns={2} padded>
        <Grid.Column floated="left" width={10}>
          <Grid.Row>
            <Segment>
              <Camera />
            </Segment>
          </Grid.Row>
          <Grid.Row>
            <Grid padded container>
              <Grid.Column width={8}>
                <Segment color="orange" inverted>
                  <CurrentShape />
                </Segment>
              </Grid.Column>
              <Grid.Column width={8}>
                <Segment color="red" inverted>
                  <UserShape />
                </Segment>
              </Grid.Column>
              <Segment color="blue" inverted width={16}>
                <PreviewShape />
              </Segment>
            </Grid>
          </Grid.Row>
        </Grid.Column>

        <Grid.Column floated="right" width={6}>
          <Segment color="green" inverted>
            <GameBoard />
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

export default GameHome
