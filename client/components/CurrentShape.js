// import {Menu, Container} from 'semantic-ui-react'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Image, Grid} from 'semantic-ui-react'
import {Countdown} from '.'

class CurrentShape extends Component {
  render() {
    const shape = this.props.currentShape.shape
    return (
      <Grid column={2} divided>
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
