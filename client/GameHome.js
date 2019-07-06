import React, {Component} from 'react'
import {Grid, Segment, Message, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {
  Camera,
  PreviewShape,
  GameBoard,
  CurrentShape,
  UserShape,
  SuccessMessage
} from './components'

class GameHome extends Component {
  render() {
    const achieved = this.props.currentShape.achieved
    const isX = this.props.currentShape.shape.name === 'X'
    return (
      <Grid padded columns={3}>
        <Grid.Column width={2} divided="true">
          {/* <Segment color="blue" inverted height="100px"> */}
          <PreviewShape />
          {/* </Segment> */}
        </Grid.Column>

        <Grid.Column width={8}>
          <Grid.Row>
            <Segment>
              <Camera />
            </Segment>
          </Grid.Row>

          <Grid.Row>
            {achieved || isX ? (
              <Segment color="orange" inverted secondary textAlign="center">
                <SuccessMessage />
              </Segment>
            ) : (
              <Grid padded columns={2}>
                <Grid.Column width={8}>
                  <Message warning attached="top">
                    <Icon name="warning" />
                    DO THIS POSE IN 3 SECOND!
                  </Message>
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
  currentShape: state.currentShape
})

export default connect(mapStateToProps)(GameHome)
