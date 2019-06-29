// import {Menu, Container} from 'semantic-ui-react'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createShapes, updateShapes} from '../store/previewShape'

class PreviewShape extends Component {
  componentDidMount() {
    this.props.createShapes()
  }

  componentDidUpdate() {}

  render() {
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
                    <td key={idx}>
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
  createShapes: () => dispatch(createShapes()),
  updateShapes: () => dispatch(updateShapes())
})

export default connect(mapStateToProps, mapDispatchToProps)(PreviewShape)
