import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateBoard} from '../store/game'
import {updateShapes, shapeAchieved} from '../store/index'
import {updateCurrent, gotPenalty} from '../store/currentShape'
import {penalty, colors} from '../AllShapes'

class Grid extends Component {
  constructor() {
    super()
    this.updateBoard = this.updateBoard.bind(this)
    this.spawnShapes = this.spawnShapes.bind(this)
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
    let grid = this.props.gameBoard
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
