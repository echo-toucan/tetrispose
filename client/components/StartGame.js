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
                  <Card.Header>Make Shape</Card.Header>
                  <Card.Meta>Match pose get shape</Card.Meta>
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
              <Card.Header>Touch shape for rotation</Card.Header>
              <Card.Meta>Touch Shapes</Card.Meta>
            </Card.Content>
          </Card>

          <Card color="blue">
            <Image src="/assets/move-left-right.gif" wrapped ui={false} />
            <Card.Content>
              <Card.Header>Move Left or Right</Card.Header>
              <Card.Meta>Move your body left or right</Card.Meta>
            </Card.Content>
          </Card>
        </Card.Group>
      </Grid.Row>
    </Grid>
  )
}

export default StartGame
