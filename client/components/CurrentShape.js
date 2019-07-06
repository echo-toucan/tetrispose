// import {Menu, Container} from 'semantic-ui-react'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Image, Header, Grid} from 'semantic-ui-react'
import {Countdown} from '.'

class CurrentShape extends Component {
  render() {
    const shape = this.props.currentShape.shape
    return (
      <div className="currentShapeContent">
        <Header as="h2">Target</Header>

        <Container fixed="true" className="fixed-width">
          <Grid.Column>
            {/* <h1>Target</h1> */}
            {shape.name ? (
              <Image size="small" src={`/assets/${shape.name}.png`} />
            ) : (
              ''
            )}
          </Grid.Column>
          <Grid.Column>
            <Countdown />
          </Grid.Column>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentShape: state.currentShape
})

export default connect(mapStateToProps)(CurrentShape)
