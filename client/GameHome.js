import React, {Component} from 'react'
import {Grid, Segment} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {
  Camera,
  PreviewShape,
  GameBoard,
  CurrentShape,
  UserShape,
  SuccessMessage,
  GamePanel,
  Score
} from './components'

class GameHome extends Component {
  render() {
    const {achieved, phase} = this.props

    return (
      <Grid padded columns={3}>
        <Grid.Column width={8}>
          <Grid.Row>
            <Segment>
              <Camera />
            </Segment>
          </Grid.Row>

          <Grid.Row>
            {achieved || (!achieved && phase === 2) ? (
              <Segment color="orange" inverted secondary textAlign="center">
                <SuccessMessage />
              </Segment>
            ) : (
              <Grid padded columns={2}>
                <Grid.Column width={8}>
                  <Segment color="yellow" inverted secondary raised>
                    <CurrentShape />
                  </Segment>
                </Grid.Column>

                <Grid.Column width={8}>
                  <Segment color="red" inverted secondary>
                    <UserShape />
                  </Segment>
                </Grid.Column>
              </Grid>
            )}
          </Grid.Row>
        </Grid.Column>

        <Grid.Column width={2} divided="true">
          <Segment>
            <GamePanel centered />
          </Segment>

          <Segment>
            <Score />
          </Segment>

          <Segment>
            <PreviewShape />
          </Segment>
        </Grid.Column>

        <Grid.Column width={6}>
          <Segment color="green" inverted secondary raised>
            <GameBoard />
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  achieved: state.currentShape.achieved,
  phase: state.phase
})

export default connect(mapStateToProps)(GameHome)
