import React, {Component} from 'react'
import GridRow from './GridRow'
import {Table} from 'semantic-ui-react'

let grid = [
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
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

export default class Grid extends Component {
  constructor() {
    super()
  }
  //ADVANCES TIME
  // ONE THAT MOVES
  hasSpaceAbove(x, y) {
    if (grid[y - 1] && grid[y - 1][x] === 0) return true
    else return false
  }
  hasSpaceBelow(x, y) {
    if (grid[y + 1] && grid[y + 1][x] === 0) return true
    else return false
  }
  updateBoard(oldGrid = grid) {
    let newGrid = oldGrid.map((row, rowIdx) => {
      return row.map((cell, cellIdx) => {
        if (this.hasSpaceBelow(cellIdx, rowIdx) && cell === 1) return cell
      })
    })
  }
  render() {
    console.log(this.hasSpaceBelow(8, 19))
    return (
      <div>
        <Table>
          <Table.Body>
            {grid.map((row, rowIdx) => {
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
