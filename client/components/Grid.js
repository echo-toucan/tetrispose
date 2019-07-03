import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateBoard} from '../store/game'
import {updateShapes, shapeAchieved} from '../store/index'
import {updateCurrent, gotPenalty} from '../store/currentShape'
import {penalty, colors} from '../AllShapes'

class Grid extends Component {
  constructor() {
    super()
    this.state = {
      rotations: 0
    }
    this.updateBoard = this.updateBoard.bind(this)
    this.spawnShapes = this.spawnShapes.bind(this)
    this.movement = this.movement.bind(this)
    this.rotate = this.rotate.bind(this)
  }
  componentDidMount() {
    this.drop()
    setTimeout(() => {
      this.spawnShapes(this.props.currentShape)
    }, 3000)
  }

  spawnShapes() {
    let shape
    if (this.props.currentShape.achieved) {
      shape = this.props.currentShape.shape.shape
    } else {
      this.props.gotPenalty()
      shape = penalty.shape
    }
    let newRows = []
    const oldGrid = this.props.gameBoard
    for (let i = 0; i < shape.length; i++) {
      let newRow = [...oldGrid[i]]
      for (let j = 0; j < shape[i].length; j++) {
        if (oldGrid[i][j + 4] < 10) {
          newRow[j + 4] = shape[i][j]
        } else {
          this.gameEnd()
        }
      }
      newRows.push(newRow)
    }
    const newGrid = [...newRows, ...this.props.gameBoard.slice(newRows.length)]
    this.props.updateBoard(newGrid)
  }

  gameEnd() {
    alert('You lose!')
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
      setTimeout(() => {
        console.log('timer')
        this.spawnShapes(this.props.currentShape)
      }, 3000)

      // console.log('props.currentShape', this.props.currentShape)
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
    if (event.key === 'ArrowLeft') {
      return this.moveLeft()
    }
    if (event.key === 'ArrowRight') {
      return this.moveRight()
    }
    if (event.key === 'ArrowUp') {
      return this.rotate()
    }
  }

  moveLeft() {
    const oldGrid = this.props.gameBoard
    if (!this.hasLeftBorder()) {
      let newGrid = oldGrid.map((row, rowIdx) => {
        return row.map((cell, colIdx) => {
          const cellToRight =
            colIdx + 1 === row.length ? 0 : oldGrid[rowIdx][colIdx + 1]

          if (cell < 10 && cellToRight < 10) {
            return cellToRight
          } else return cell
        })
      })
      this.props.updateBoard(newGrid)
    }
  }

  hasLeftBorder() {
    const grid = this.props.gameBoard
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const current = grid[row][col]
        const isFalling = current > 0 && current < 10
        const hasLeftWall = col === 0 || grid[row][col - 1] >= 10
        if (isFalling && hasLeftWall) {
          return true
        }
      }
    }
    return false
  }

  moveRight() {
    const oldGrid = this.props.gameBoard
    if (!this.hasRightBorder()) {
      let newGrid = oldGrid.map((row, rowIdx) => {
        return row.map((cell, colIdx) => {
          const cellToLeft = colIdx === 0 ? 0 : oldGrid[rowIdx][colIdx - 1]
          if (cell < 10 && cellToLeft < 10) {
            return cellToLeft
          } else return cell
        })
      })
      this.props.updateBoard(newGrid)
    }
  }

  hasRightBorder() {
    const grid = this.props.gameBoard
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const current = grid[row][col]
        const isFalling = current > 0 && current < 10
        const hasRightWall =
          col + 1 === grid[row].length || grid[row][col + 1] >= 10
        if (isFalling && hasRightWall) {
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

  rotate() {
    const rotations = this.props.currentShape.shape.rotations

    const rotatedShape = rotations[this.state.rotations % rotations.length]
    let newRows = []

    const [pivotRow, pivotCol] = this.adjustPivot(rotatedShape)
    const oldGrid = this.removeFallingShape()

    for (let i = 0; i < rotatedShape.length; i++) {
      let newRow = [...oldGrid[pivotRow + i]]
      for (let j = 0; j < rotatedShape[i].length; j++) {
        newRow[pivotCol + j] = rotatedShape[i][j]
      }
      newRows.push(newRow)
    }

    const rowsAbove = oldGrid.slice(0, pivotRow)
    const rowsBelow = oldGrid.slice(pivotRow + newRows.length)

    const newGrid = [...rowsAbove, ...newRows, ...rowsBelow]
    this.props.updateBoard(newGrid)
    this.setState(prevState => ({
      rotations: prevState.rotations + 1
    }))
  }

  // canRotate(shape, pivot) {
  //   const grid = this.props.gameBoard
  //   //check if pivot point needs to be adjusted
  //   //check if necessary to invoke that function
  // }

  adjustPivot(shape) {
    const grid = this.props.gameBoard
    const [pivotRow, pivotCol] = this.findPivot()
    let [newPivotRow, newPivotCol] = [pivotRow, pivotCol]
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        console.log('FIRST ONE', pivotCol + col, 'ROW', pivotRow)
        if (
          pivotCol + col >= grid[pivotRow].length ||
          grid[pivotRow + row][pivotCol + col] >= 10
        ) {
          newPivotCol--
        }
      }
    }
    console.log('---', [newPivotRow, newPivotCol])
    return [newPivotRow, newPivotCol]
  }

  removeFallingShape() {
    const oldGrid = this.props.gameBoard
    const clearBoard = oldGrid.map(row => {
      return row.map(rowCell => {
        if (rowCell >= 10) return rowCell
        else return 0
      })
    })
    return clearBoard
  }
  findPivot() {
    const grid = this.props.gameBoard
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] > 0 && grid[i][j] < 10) return [i, j]
      }
    }
  }

  render() {
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
  currentShape: state.currentShape,
  gameBoard: state.gameBoard,
  previewShape: state.previewShape
})

const mapDispatchToProps = dispatch => ({
  updateBoard: board => dispatch(updateBoard(board)),
  updateCurrent: shape => dispatch(updateCurrent(shape)),
  updateShapes: () => dispatch(updateShapes()),
  gotPenalty: () => dispatch(gotPenalty())
})

export default connect(mapStateToProps, mapDispatchToProps)(Grid)
