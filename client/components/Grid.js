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
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]
    }
    this.updateBoard = this.updateBoard.bind(this)
    this.spawnShapes = this.spawnShapes.bind(this)
  }

  spawnShapes(shapeId) {
    const line = [[1, 1, 1, 1]]
    const tShape = [[0, 2, 0], [2, 2, 2]]
    let newRows = []
    for (let i = 0; i < tShape.length; i++) {
      let newRow = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      for (let j = 0; j < tShape[i].length; j++) {
        newRow[j + 4] = tShape[i][j]
      }
      newRows.push(newRow)
    }

    this.setState(prevState => ({
      grid: [...newRows, ...prevState.grid.slice(newRows.length)]
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
    if (this.hasCollided()) {
      console.log('it collided')
    } else {
      let newGrid = oldGrid.map((row, rowIdx) => {
        return row.map((cell, colIdx) => {
          const cellAbove = rowIdx === 0 ? 0 : oldGrid[rowIdx - 1][colIdx]
          if (cell < 10) {
            return cellAbove
          } else return cell
          // if (cell === 1 && !this.hasSpaceBelow(cellIdx, rowIdx))
          //   hasCollided = true
          // if (!hasCollided) {
          //   if (cell === 0 && !this.hasSpaceAbove(cellIdx, rowIdx)) {
          //     return 1
          //   } else if (
          //     cell === 1 &&
          //     this.hasSpaceAbove(cellIdx, rowIdx) &&
          //     this.hasSpaceBelow(cellIdx, rowIdx)
          //   ) {
          //     return 0
          //   } else return cell
          // } else return cell
        })
      })
      this.setState({grid: newGrid})
    }
  }

  hasCollided() {
    const grid = this.state.grid
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        // console.log('row', row)
        const current = grid[row][col]
        const isFalling = current > 0 && current < 10
        const hasFloorBelow = !grid[row + 1] || grid[row + 1][col] >= 10
        if (isFalling && hasFloorBelow) {
          return true
        }
      }
    }
    return false
  }

  stopDrop() {
    const grid = this.state.grid
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < row.length; col++) {
        if (!grid[row + 1] || grid[row + 1][col] >= 10) {
          return true
        }
      }
    }
    return false
  }

  // shouldFall(cell, cellIdx, rowIdx) {
  //   if (cell === 0 && !this.hasSpaceAbove(cellIdx, rowIdx)) {
  //     return true
  //   } else if (
  //     cell === 1 &&
  //     this.hasSpaceAbove(cellIdx, rowIdx) &&
  //     this.hasSpaceBelow(cellIdx, rowIdx)
  //   ) {
  //     return true
  //   } else return false
  // }

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
