import React from 'react'
import {Button, Grid, Card, Image, Header} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import ControlledCarousel from './Carousel'

const StartGame = () => {
  return (
    <Grid rows={3} padded>
      <Grid.Row>
        <Button animated="fade" primary size="huge" as={Link} to="/gamehome">
          <Button.Content visible>Start Game</Button.Content>
          <Button.Content hidden>Play Tetris</Button.Content>
        </Button>
      </Grid.Row>

      <Grid.Row centered>
        <ControlledCarousel />
      </Grid.Row>

      <Grid.Row>
        <Card.Group itemsPerRow={3}>
          <Card color="purple">
            <Image src="/assets/Imgur-shapes.gif" wrapped ui={false} />
            <Card.Content>
              <Card.Header>
                <Header centered>Match Shape With Body Pose</Header>
              </Card.Header>
            </Card.Content>
          </Card>

          <Card color="red">
            <Image src="/assets/Imgur-rotations.gif" wrapped ui={false} />
            <Card.Content>
              <Card.Header>
                <Header centered>Touch Shape for Rotation</Header>
              </Card.Header>
            </Card.Content>
          </Card>

          <Card color="blue" centered>
            <Image src="/assets/move-left-right.gif" wrapped ui={false} />
            <Card.Content centered>
              <Card.Header centered>
                <Header>Move Left or Right</Header>
              </Card.Header>
            </Card.Content>
          </Card>
        </Card.Group>
      </Grid.Row>
    </Grid>
  )
}

export default StartGame
