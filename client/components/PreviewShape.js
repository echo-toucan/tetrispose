// import {Menu, Container} from 'semantic-ui-react'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createShapes} from '../store/previewShape'

class PreviewShape extends Component {
  componentDidMount() {
    this.props.createShapes()
  }

  render() {
    //render displays an image for each of the shapes from the store.
    //these images have the same name as the shape, e.g. I.png
    const shapes = this.props.shapes
    return (
      <div>
        <h3>Upcoming shapes:</h3>
        {shapes ? (
          <table id="preview-shape">
            <tbody>
              <tr>
                {shapes.map((shape, idx) => {
                  return (
                    <td key={idx} align="center">
                      <img
                        className="preview-image"
                        src={`/assets/${shape.name}.png`}
                      />
                    </td>
                  )
                })}
              </tr>
            </tbody>
          </table>
        ) : (
          <h5>Loading...</h5>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  shapes: state.previewShape
})

const mapDispatchToProps = dispatch => ({
  createShapes: () => dispatch(createShapes())
})

export default connect(mapStateToProps, mapDispatchToProps)(PreviewShape)
