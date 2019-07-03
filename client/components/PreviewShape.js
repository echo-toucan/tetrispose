import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createShapes, setFirstShape} from '../store'
import {Container, Image, Grid} from 'semantic-ui-react'

class PreviewShape extends Component {
  componentDidMount() {
    this.props.createShapes()
    this.props.setFirstShape()
  }

  render() {
    //render displays an image for each of the shapes from the store.
    //these images have the same name as the shape, e.g. I.png
    const shapes = this.props.shapes
    return (
      <div>
        <Container fixed="top" className="preview-image">
          <Grid.Row>
            <h3>Upcoming shapes:</h3>
          </Grid.Row>
          {shapes ? (
            <Grid.Row>
              {shapes.map((shape, idx) => {
                return (
                  <div key={idx} className="preview-image">
                    <Image src={`/assets/${shape.name}.png`} />
                  </div>
                )
              })}
            </Grid.Row>
          ) : (
            <h5>Loading...</h5>
          )}
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  shapes: state.previewShape
})

const mapDispatchToProps = dispatch => ({
  createShapes: () => dispatch(createShapes()),
  setFirstShape: () => dispatch(setFirstShape())
})

export default connect(mapStateToProps, mapDispatchToProps)(PreviewShape)
