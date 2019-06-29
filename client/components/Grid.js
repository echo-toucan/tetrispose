import React, {Component} from 'react'
import GridRow from './GridRow'
import {Table, Container, Grid as SGrid} from 'semantic-ui-react'
import shapesArray from '../AllShapes'

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

  spawnShapes() {
    const shapeId = Math.floor(Math.random() * shapesArray.length)
    console.log(shapeId)
    const shape = shapesArray[shapeId].shape
    let newRows = []
    for (let i = 0; i < shape.length; i++) {
      let newRow = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      for (let j = 0; j < shape[i].length; j++) {
        newRow[j + 4] = shape[i][j]
      }
      newRows.push(newRow)
    }

    this.setState(prevState => ({
      grid: [...newRows, ...prevState.grid.slice(newRows.length)]
    }))
  }

  //sets the tetris board speed
  drop() {
    setInterval(this.updateBoard, 500)
  }

  //it updates the board when an active shape moves down or lands
  updateBoard() {
    const oldGrid = this.state.grid
    if (this.hasCollided()) {
      console.log('it collided')
      this.stopDrop()
    } else {
      let newGrid = oldGrid.map((row, rowIdx) => {
        return row.map((cell, colIdx) => {
          const cellAbove = rowIdx === 0 ? 0 : oldGrid[rowIdx - 1][colIdx]
          if (cell < 10 && cellAbove < 10) {
            return cellAbove
          } else return cell
        })
      })
      this.setState({grid: newGrid})
    }
  }

  //checks if the active shape has landed
  hasCollided() {
    const grid = this.state.grid
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
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

  //changes the active shape id from falling to stationary by adding 10.
  stopDrop() {
    const oldGrid = this.state.grid
    let newGrid = oldGrid.map(row => {
      return row.map(cell => {
        if (cell > 0 && cell < 10) {
          return cell + 10
        } else {
          return cell
        }
      })
    })
    this.setState({grid: newGrid})
  }

  render() {
    const colors = [
      'black',
      'yellow',
      'cyan',
      'red',
      'limegreen',
      'magenta',
      'orange',
      'blue'
    ]
    return (
      <div>
        <button type="button" onClick={() => this.drop()}>
          Drop!
        </button>
        <button type="button" onClick={() => this.spawnShapes()}>
          Spawn a shape
        </button>
        <table>
          <tbody>
            {this.state.grid.map((row, rowIdx) => {
              return (
                <tr key={rowIdx} className="game-row">
                  {row.map((cell, cellIdx) => {
                    return (
                      <td
                        key={cellIdx}
                        style={{backgroundColor: colors[cell % 10]}}
                        className="game-cell"
                      />
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
