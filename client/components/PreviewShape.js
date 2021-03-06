import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {createShapes, setFirstShape} from '../store'
import {Container, Image, Grid, Segment} from 'semantic-ui-react'

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
      <Fragment>
        {/* <Container fixed="top" className="preview-image"> */}
        {shapes ? (
          <Grid.Row>
            <Segment textAlign="center" color="green">
              <h3>Next Shape</h3>
            </Segment>
            {shapes.map((shape, idx) => {
              return (
                <div key={idx}>
                  <Segment padded stacked color="green" inverted secondary>
                    <Image src={`/assets/${shape.name}.png`} />
                  </Segment>
                </div>
              )
            })}
          </Grid.Row>
        ) : (
          <h5>Loading...</h5>
        )}
        {/* </Container> */}
      </Fragment>
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
