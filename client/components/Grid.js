import React, {Component} from 'react'
import GridRow from './GridRow'
import {Table} from 'semantic-ui-react'

// let grid = [
//   [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// ]

export default class Grid extends Component {
  constructor() {
    super()
    this.state = {
      grid: [
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]
    }
    this.updateBoard = this.updateBoard.bind(this)
    this.spawnShapes = this.spawnShapes.bind(this)
  }
  //ADVANCES TIME
  // ONE THAT MOVES
  spawnShapes(shapeId) {
    const line = [1, 1, 1, 1]
    const tShape = [[0, 1, 0], [1, 1, 1]]
    let newRow = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (let i = 0; i < line.length; i++) {
      newRow[i + 4] = line[i]
    }
    console.log([newRow, ...this.state.grid.slice(1)])
    this.setState(prevState => ({
      grid: [newRow, ...prevState.grid.slice(1)]
    }))
  }
  drop() {
    setInterval(this.updateBoard, 500)
  }
  hasSpaceAbove(x, y) {
    const grid = this.state.grid
    if (!grid[y - 1] || grid[y - 1][x] === 0) return true
    else return false
  }
  hasSpaceBelow(x, y) {
    const grid = this.state.grid
    if (grid[y + 1] && grid[y + 1][x] === 0) return true
    else return false
  }
  updateBoard() {
    const oldGrid = this.state.grid

    let newGrid = oldGrid.map((row, rowIdx) => {
      return row.map((cell, cellIdx) => {
        if (cell === 0 && !this.hasSpaceAbove(cellIdx, rowIdx)) {
          return 1
        } else if (
          cell === 1 &&
          this.hasSpaceAbove(cellIdx, rowIdx) &&
          this.hasSpaceBelow(cellIdx, rowIdx)
        ) {
          return 0
        } else return cell
      })
    })
    this.setState({grid: newGrid})
  }
  render() {
    return (
      <div>
        <button type="button" onClick={() => this.drop()}>
          Drop!
        </button>
        <button type="button" onClick={() => this.spawnShapes('line')}>
          Spawn a Line
        </button>
        <Table>
          <Table.Body>
            {this.state.grid.map((row, rowIdx) => {
              return (
                <Table.Row key={rowIdx}>
                  {row.map((cell, cellIdx) => {
                    return <Table.Cell key={cellIdx}>{cell}</Table.Cell>
                  })}
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </div>
    )
  }
}
