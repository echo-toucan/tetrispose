// import {Menu, Container} from 'semantic-ui-react'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Image, Grid} from 'semantic-ui-react'
import {Countdown} from '.'

class CurrentShape extends Component {
  render() {
    const shape = this.props.currentShape.shape
    return (
      <Grid column={3} divided>
        <Grid.Column width={5}>
          {shape.name ? (
            <Image
              size="small"
              src={`/assets/${shape.name}.png`}
              className="animated infinite heartBeat"
            />
          ) : (
            'Loading Shape'
          )}
        </Grid.Column>
        <Grid.Column width={5}>
          {this.props.gameStarted ? (
            <Image
              size="small"
              src={`/assets/StickFigures/${shape.name}_Stick.png`}
            />
          ) : (
            ''
          )}
        </Grid.Column>
        <Grid.Column width={6}>
          {this.props.gameStarted ? <Countdown /> : ''}
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  currentShape: state.currentShape,
  gameStarted: state.gameState.started
})

export default connect(mapStateToProps)(CurrentShape)
