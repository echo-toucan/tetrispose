const hasLeftBorder = gameBoard => {
  const grid = gameBoard
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

export const moveLeft = gameBoard => {
  const oldGrid = gameBoard
  if (!hasLeftBorder(gameBoard)) {
    let newGrid = oldGrid.map((row, rowIdx) => {
      return row.map((cell, colIdx) => {
        const cellToRight =
          colIdx + 1 === row.length ? 0 : oldGrid[rowIdx][colIdx + 1]

        if (cell < 10 && cellToRight < 10) {
          return cellToRight
        } else return cell
      })
    })
    return newGrid
  }
}

const hasRightBorder = gameBoard => {
  const grid = gameBoard
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

export const moveRight = gameBoard => {
  const oldGrid = gameBoard
  if (!hasRightBorder(gameBoard)) {
    let newGrid = oldGrid.map((row, rowIdx) => {
      return row.map((cell, colIdx) => {
        const cellToLeft = colIdx === 0 ? 0 : oldGrid[rowIdx][colIdx - 1]
        if (cell < 10 && cellToLeft < 10) {
          return cellToLeft
        } else return cell
      })
    })
    return newGrid
  }
}
//checks if the active shape has landed
// hasCollided() {
//   const grid = this.props.gameBoard
//   for (let row = 0; row < grid.length; row++) {
//     for (let col = 0; col < grid[row].length; col++) {
//       const current = grid[row][col]
//       const isFalling = current > 0 && current < 10
//       const hasFloorBelow = !grid[row + 1] || grid[row + 1][col] >= 10
//       if (isFalling && hasFloorBelow) {
//         return true
//       }
//     }
//   }
//   return false
// }

//changes the active shape id from falling to stationary by adding 10.
// stopDrop() {
//   const oldGrid = this.props.gameBoard
//   let newGrid = oldGrid.map(row => {
//     return row.map(cell => {
//       if (cell > 0 && cell < 10) {
//         return cell + 10
//       } else {
//         return cell
//       }
//     })
//   })
//   this.props.updateBoard(newGrid)
// }

const canRotate = (shape, pivotRow, pivotCol) => {
  if (pivotCol < 0) return false
  const grid = this.props.gameBoard
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (grid[pivotRow + row][pivotCol + col] >= 10) {
        return false
      }
    }
  }
  return true
}

const adjustPivot = shape => {
  const grid = this.props.gameBoard
  const [pivotRow, pivotCol] = this.findPivot()
  let [newPivotRow, newPivotCol] = [pivotRow, pivotCol]
  let offset = 0
  //Is it necessary to loop through all rows of the rotated shape, or just the first one???
  //Also, what about empty squares in a shape?? Can they be ignored or must they be counted?
  for (let row = 0; row < shape.length; row++) {
    let rowOffset = 0
    for (let col = 0; col < shape[row].length; col++) {
      if (
        pivotCol + col >= grid[pivotRow].length ||
        grid[pivotRow + row][pivotCol + col] >= 10
      ) {
        rowOffset++
      }
      if (rowOffset > offset) {
        offset = rowOffset
      }
    }
  }
  return [newPivotRow, newPivotCol - offset]
}

const removeFallingShape = () => {
  const oldGrid = this.props.gameBoard
  const clearBoard = oldGrid.map(row => {
    return row.map(rowCell => {
      if (rowCell >= 10) return rowCell
      else return 0
    })
  })
  return clearBoard
}
const findPivot = gameBoard => {
  const grid = gameBoard
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] > 0 && grid[i][j] < 10) return [i, j]
    }
  }
}

const rotate = gameBoard => {
  const rotations = this.props.currentShape.shape.rotations
  const rotatedShape = rotations[this.state.rotations % rotations.length]

  const [pivotRow, pivotCol] = this.adjustPivot(rotatedShape)

  if (canRotate(rotatedShape, pivotRow, pivotCol)) {
    const oldGrid = this.removeFallingShape()
    let newRows = []

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
}
