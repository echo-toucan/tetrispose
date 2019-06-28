import React, {Component} from 'react'
import GridCell from './GridCell'

export default class GridRow extends Component {
  render() {
    let cells = new Array(10)
    return (
      <div>
        {cells.map((cell, idx) => {
          return <GridCell key={idx} />
        })}
      </div>
    )
  }
}
