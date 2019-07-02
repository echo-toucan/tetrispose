import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateBoard} from '../store/game'
import {updateShapes, shapeAchieved} from '../store/index'
import {updateCurrent} from '../store/currentShape'

class Grid extends Component {
  constructor() {
    super()
    this.updateBoard = this.updateBoard.bind(this)
    this.spawnShapes = this.spawnShapes.bind(this)
    this.movement = this.movement.bind(this)
    this.leftBorder = this.leftBorder.bind(this)
  }

  spawnShapes() {
    const shape = this.props.currentShape.shape
    let newRows = []
    for (let i = 0; i < shape.length; i++) {
      let newRow = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      for (let j = 0; j < shape[i].length; j++) {
        newRow[j + 4] = shape[i][j]
      }
      newRows.push(newRow)
    }
    const newGrid = [...newRows, ...this.props.gameBoard.slice(newRows.length)]
    this.props.updateBoard(newGrid)
  }

  //sets the tetris board speed
  drop() {
    setInterval(this.updateBoard, 500)
  }
  //it updates the board when an active shape moves down or lands
  updateBoard() {
    const oldGrid = this.props.gameBoard
    if (this.hasCollided()) {
      this.stopDrop()
      const newCurrent = this.props.previewShape[0]
      this.props.updateCurrent(newCurrent)
      console.log('props.currentShape', this.props.currentShape)
      this.props.updateShapes()
    } else {
      let newGrid = oldGrid.map((row, rowIdx) => {
        return row.map((cell, colIdx) => {
          const cellAbove = rowIdx === 0 ? 0 : oldGrid[rowIdx - 1][colIdx]
          if (cell < 10 && cellAbove < 10) {
            return cellAbove
          } else return cell
        })
      })
      // console.log('----', this.props)
      this.props.updateBoard(newGrid)
    }
  }
  movement(event) {
    // console.log('-------', event.key)
    if (event.key === 'ArrowLeft') {
      console.log('we are moving left', event.key)
      return this.moveLeft()
    } else if (event.key === 'ArrowRight') {
      console.log('we are moving right', event.key)
      return this.moveRight()
    } else {
      console.log(event.key)
    }
  }

  moveLeft() {
    const oldGrid = this.props.gameBoard
    if (!this.leftBorder()) {
      console.log('WE HERE')
      let newGrid = oldGrid.map((row, rowIdx) => {
        return row.map((cell, colIdx) => {
          const cellLeft = oldGrid[rowIdx][colIdx + 1]
          console.log('cellleft', cellLeft)
          if (cell < 10 && cellLeft < 10) {
            return cellLeft
          } else return cell
        })
      })
      this.props.updateBoard(newGrid)
    } else {
      console.log('yay')
    }
  }

  leftBorder() {
    const grid = this.props.gameBoard
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const current = grid[row][col]
        const isFalling = current > 0 && current < 10
        const hasLeftWall = col === 0 || grid[row][col - 1] >= 10
        // console.log('leftRoom', hasLeftRoom)
        // console.log(grid)
        if (isFalling && hasLeftWall) {
          return true
        }
      }
    }
    return false
  }

  moveRight() {
    const oldGrid = this.props.gameBoard
    if (this.rightBorder() === true) {
      console.log('WE HERE')
      let newGrid = oldGrid.map((row, rowIdx) => {
        return row.map((cell, colIdx) => {
          const cellRight = oldGrid[rowIdx][colIdx - 1]
          if (cell < 10 && cellRight < 10) {
            return cellRight
          } else return cell
        })
      })
      this.props.updateBoard(newGrid)
    } else {
      console.log('yay')
    }
  }

  rightBorder() {
    const grid = this.props.gameBoard
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const current = grid[row][col]
        const isFalling = current > 0 && current < 10
        const hasLeftRoom = grid[row][col - 1]
        console.log('leftRoom', hasLeftRoom)
        console.log(grid)
        if (isFalling && hasLeftRoom) {
          return true
        }
      }
    }
    return false
  }
  //checks if the active shape has landed
  hasCollided() {
    const grid = this.props.gameBoard
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
    const oldGrid = this.props.gameBoard
    let newGrid = oldGrid.map(row => {
      return row.map(cell => {
        if (cell > 0 && cell < 10) {
          return cell + 10
        } else {
          return cell
        }
      })
    })
    this.props.updateBoard(newGrid)
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
    let grid = this.props.gameBoard
    return (
      <div>
        <button type="button" onClick={() => this.drop()}>
          Drop!
        </button>
        <input onKeyDown={event => this.movement(event)} />
        <button type="button" onClick={() => this.spawnShapes()}>
          Spawn a shape
        </button>

        <table>
          <tbody>
            {grid.map((row, rowIdx) => {
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

const mapStateToProps = state => ({
  currentShape: state.currentShape.shape,
  gameBoard: state.gameBoard,
  previewShape: state.previewShape
})

const mapDispatchToProps = dispatch => ({
  updateBoard: board => dispatch(updateBoard(board)),
  updateCurrent: shape => dispatch(updateCurrent(shape)),
  updateShapes: () => dispatch(updateShapes())
})

export default connect(mapStateToProps, mapDispatchToProps)(Grid)
