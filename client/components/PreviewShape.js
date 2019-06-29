// import {Menu, Container} from 'semantic-ui-react'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createShapes, updateShapes} from '../store/previewShape'
import allShapes from '../AllShapes'

class PreviewShape extends Component {
  async componentDidMount() {}

  render() {
    return <h1>Display Preview shape</h1>
  }
}

const mapStateToProps = state => ({
  previewShape: this.state.previewShape
})

const mapDispatchToProps = dispatch => ({
  createShapes: () => dispatch(createShapes()),
  updateShapes: () => dispatch(updateShapes())
})

export default connect(mapStateToProps, mapDispatchToProps)(PreviewShape)
