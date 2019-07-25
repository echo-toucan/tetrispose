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
  if (!hasLeftBorder(gameBoard)) {
    let newGrid = gameBoard.map((row, rowIdx) => {
      return row.map((cell, colIdx) => {
        const barrierOnRight =
          colIdx + 1 === row.length || gameBoard[rowIdx][colIdx + 1] > 10

        const cellToRight = barrierOnRight ? 0 : gameBoard[rowIdx][colIdx + 1]

        if (cell < 10 && cellToRight < 10) {
          return cellToRight
        } else return cell
      })
    })
    return newGrid
  } else return gameBoard
}

const hasRightBorder = gameBoard => {
  for (let row = 0; row < gameBoard.length; row++) {
    for (let col = 0; col < gameBoard[row].length; col++) {
      const current = gameBoard[row][col]
      const isFalling = current > 0 && current < 10
      const hasRightWall =
        col + 1 === gameBoard[row].length || gameBoard[row][col + 1] >= 10
      if (isFalling && hasRightWall) {
        return true
      }
    }
  }
  return false
}

export const moveRight = gameBoard => {
  if (!hasRightBorder(gameBoard)) {
    let newGrid = gameBoard.map((row, rowIdx) => {
      return row.map((cell, colIdx) => {
        const barrierOnLeft = colIdx === 0 || gameBoard[rowIdx][colIdx - 1] > 10
        const cellToLeft = barrierOnLeft ? 0 : gameBoard[rowIdx][colIdx - 1]
        if (cell < 10 && cellToLeft < 10) {
          return cellToLeft
        } else return cell
      })
    })
    return newGrid
  } else return gameBoard
}

const canRotate = (grid, shape, pivotRow, pivotCol) => {
  if (pivotCol < 0) return false
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (grid[pivotRow + row][pivotCol + col] >= 10) {
        return false
      }
    }
  }
  return true
}

const findPivot = grid => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] > 0 && grid[i][j] < 10) return [i, j]
    }
  }
  return [0, 0]
}

const adjustPivot = (shape, grid) => {
  const [pivotRow, pivotCol] = findPivot(grid)
  let [newPivotRow, newPivotCol] = [pivotRow, pivotCol]
  let offset = 0
  for (let row = 0; row < shape.length && row + pivotRow < 20; row++) {
    let rowOffset = 0
    for (let col = 0; col < shape[row].length; col++) {
      if (pivotRow + row > 19) break
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

const removeFallingShape = gameBoard => {
  const oldGrid = gameBoard
  const clearBoard = oldGrid.map(row => {
    return row.map(rowCell => {
      if (rowCell >= 10) return rowCell
      else return 0
    })
  })
  return clearBoard
}

//rotations and counter must be passed in when action is dispatched!
export const rotate = (grid, rotations, target) => {
  const rotatedShape = rotations[target]
  const [pivotRow, pivotCol] = adjustPivot(rotatedShape, grid)

  if (canRotate(grid, rotatedShape, pivotRow, pivotCol)) {
    const oldGrid = removeFallingShape(grid)
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
    return newGrid
  } else return grid
}

export const move = (gameBoard, column) => {
  const [shapeRow, shapeCol] = findPivot(gameBoard)
  if (column < shapeCol) {
    return moveLeft(gameBoard)
  } else if (column > shapeCol) {
    return moveRight(gameBoard)
  } else {
    return gameBoard
  }
}

// const columnHeights = gameBoard => {
//   let heights = new Array(10).fill(19)
//   for (let row = 0; row < gameBoard.length; row++) {
//     for (let col = 0; col < gameBoard[row].length; col++) {
//       if (gameBoard[row][col] >= 10) heights[col] = row
//     }
//   }
//   return heights
// }

// const distanceToFall = gameBoard => {
//   let spaceBelow = Infinity
//   const heights = columnHeights(gameBoard)
//   for (let row = 0; row < gameBoard.length; row++) {
//     for (let col = 0; col < gameBoard[row].length; col++) {
//       const current = gameBoard[row][col]
//       const isFalling = current > 0 && current < 10
//       const colSpaceBelow = heights[col] - row
//       if (isFalling && colSpaceBelow < spaceBelow) {
//         spaceBelow = colSpaceBelow
//       }
//     }
//   }
//   return spaceBelow
// }

const hasCollided = gameBoard => {
  for (let row = 0; row < gameBoard.length; row++) {
    for (let col = 0; col < gameBoard[row].length; col++) {
      const current = gameBoard[row][col]
      const isFalling = current > 0 && current < 10
      const hasFloorBelow = !gameBoard[row + 1] || gameBoard[row + 1][col] >= 10
      if (isFalling && hasFloorBelow) {
        return true
      }
    }
  }
  return false
}

export const drop = gameBoard => {
  if (hasCollided(gameBoard)) return gameBoard
  return gameBoard.map((row, rowIdx, oldGrid) => {
    return row.map((cell, colIdx) => {
      if (cell > 10) return cell
      const cellAbove = rowIdx === 0 ? 0 : oldGrid[rowIdx - 1][colIdx]
      if (cell < 10 && cellAbove < 10) {
        return cellAbove
      } else if (cellAbove >= 10) {
        return 0
      } else return cell
    })
  })
}

export const fastDrop = gameBoard => {
  let newBoard = gameBoard
  while (!hasCollided(newBoard)) {
    newBoard = drop(newBoard)
  }
  return newBoard
}
