// import {Menu, Container} from 'semantic-ui-react'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Image, Header} from 'semantic-ui-react'

class CurrentShape extends Component {
  render() {
    const shape = this.props.currentShape.shape
    return (
      <div className="currentShapeContent">
        <Header as="h2">Target</Header>

        <Container fixed="true" className="fixed-width">
          {/* <h1>Target</h1> */}
          {shape.name ? (
            <Image size="small" src={`/assets/${shape.name}.png`} />
          ) : (
            ''
          )}
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentShape: state.currentShape
})

export default connect(mapStateToProps)(CurrentShape)
