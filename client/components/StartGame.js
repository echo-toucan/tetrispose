import React from 'react'
import {Button, Grid, Card, Image, Popup, Rating} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const StartGame = () => {
  return (
    <Grid rows={2} padded>
      <Grid.Row divided>
        <Button animated="fade" primary size="huge" as={Link} to="/gamehome">
          <Button.Content visible>Start Game</Button.Content>
          <Button.Content hidden>Play Tetris</Button.Content>
        </Button>
      </Grid.Row>

      <Grid.Row>
        <Card.Group itemsPerRow={3}>
          <Popup
            position="top right"
            trigger={
              <Card color="purple">
                <Image src="/assets/Imgur-shapes.gif" wrapped ui={false} />
                <Card.Content>
                  <Card.Header>
                    <h1>Match the Shape with your Body Pose</h1>
                  </Card.Header>
                  <Card.Meta>
                    <br />
                    <h2>Match the shapes with the following poses:</h2>
                    <h3>I : Raise both hands up with your wrist close </h3>
                    <h3>
                      J : Raise right arm up with left arm parallel to floor
                    </h3>
                    <h3>
                      L: Raise left arm up with right arm parallel to floor
                    </h3>
                    <h3>T: Raise both arms parallel to the floor</h3>
                    <br />
                  </Card.Meta>
                </Card.Content>
              </Card>
            }
          >
            <Popup.Header>User Rating</Popup.Header>
            <Popup.Content>
              <Rating icon="star" defaultRating={3} maxRating={4} />
            </Popup.Content>
          </Popup>

          <Card color="red">
            <Image src="/assets/Imgur-rotations.gif" wrapped ui={false} />
            <Card.Content>
              <Card.Header>
                <h1>Touch Shape for Rotation</h1>
              </Card.Header>
              <Card.Meta>
                <br />
                <h3>
                  After the shape has appeared on the grid, multiple rotations
                  of the shape will appear above the player.
                </h3>
                <h3>
                  The player can reach their hand out to any of those position
                  to rotate the shape falling in the grid.
                </h3>
                <br />
              </Card.Meta>
            </Card.Content>
          </Card>

          <Card color="blue">
            <Image src="/assets/move-left-right.gif" wrapped ui={false} />
            <Card.Content>
              <Card.Header>
                <h1>Move Left or Right</h1>
              </Card.Header>
              <Card.Meta>
                <br />
                <h3>
                  Move Left or Right, slowly to control the location at which
                  the Tetris piece will land at.
                </h3>
                <br />
              </Card.Meta>
            </Card.Content>
          </Card>
        </Card.Group>
      </Grid.Row>
    </Grid>
  )
}

export default StartGame
