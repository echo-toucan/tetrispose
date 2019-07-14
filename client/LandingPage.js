import React from 'react'
import {Button, Container, Header, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const HomepageLayout = ({mobile}) => (
  <Container text>
    <Header
      as="h1"
      content="Tetris Pose"
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '2em'
      }}
    />
    <Header
      as="h2"
      content="Welcome to Tetris Pose, a new twist on the classic game. Using Google's TensorFlow PoseNet technology, Tetris Pose lets you use body movements to control the tetris game!"
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em'
      }}
    />
    <Button primary size="huge" as={Link} to="/homepage">
      Game Tutorial
      <Icon name="right arrow" />
    </Button>

    <Button primary size="huge" as={Link} to="/gamehome">
      <Icon name="gamepad" />
      Play Now
    </Button>

    <Button primary size="huge" as={Link} to="/portfolio">
      <Icon name="github square" />
      Meet the Developers
    </Button>
  </Container>
)

export default HomepageLayout
