// import {Menu, Container} from 'semantic-ui-react'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createShapes, updateShapes} from '../store/previewShape'
import allShapes from '../AllShapes'

class PreviewShape extends Component {
  componentDidMount() {
    this.props.createShapes()
  }

  render() {
    const shapes = this.state.shapes
    return (
      <div>
        <h6>Upcoming shapes:</h6>
        {shapes ? (
          shapes.map(shape => {
            return <img src={`/assets/${shape.name}.png`} />
          })
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
