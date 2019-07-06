// import {Menu, Container} from 'semantic-ui-react'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Image, Header, Grid} from 'semantic-ui-react'
import {Countdown} from '.'

class CurrentShape extends Component {
  render() {
    const shape = this.props.currentShape.shape
    return (
      // <div className="currentShapeContent">
      <Grid column={2} divided>
        {/* <Header as="h2">Target</Header> */}

        {/* <Container fixed="true" className="fixed-width"> */}
        <Grid.Column width={8}>
          {shape.name ? (
            <Image
              size="small"
              src={`/assets/${shape.name}.png`}
              className="animated infinite heartBeat"
            />
          ) : (
            'Please match this shape'
          )}
        </Grid.Column>
        <Grid.Column width={8}>
          <Countdown />
        </Grid.Column>
        {/* </Container> */}
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  currentShape: state.currentShape
})

export default connect(mapStateToProps)(CurrentShape)
