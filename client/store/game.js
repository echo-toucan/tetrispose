import shapesArray from '../AllShapes'

const gameBoardArray = [
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

export const newShape = () => ({
  type: 'SPAWN_SHAPE'
})

export const updateSHAPE = shape => ({
  type: 'UPDATE_SHAPE',
  shape
})

export const updateBoard = (board, spawn) => ({
  type: 'UPDATE_BOARD',
  payload: board,
  spawn
})

export const updateScore = score => ({
  type: 'UPDATE_SCORE',
  payload: score
})

export const changeGameStatus = status => ({
  type: 'SWITCH_GAME_ON',
  payload: status
})

export const startGame = started => ({
  type: 'START_GAME',
  payload: started
})

export const changeGameOver = gameOver => ({
  type: 'SWITCH_GAME_OVER',
  payload: gameOver
})

export const resetGame = () => ({
  type: 'RESET_GAME'
})

export const gameBoard = (state = Array.from(gameBoardArray), action) => {
  switch (action.type) {
    case 'UPDATE_BOARD':
      return action.payload
    case 'RESET_GAME':
      return [
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
    default:
      return state
  }
}

export const currentShape = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_BOARD':
      if (action.spawn) {
        return shapesArray[Math.floor(Math.random() * shapesArray.length)]
      } else {
        return state
      }
    case 'UPDATE_SHAPE':
      return action.Shape
    case 'SPAWN_SHAPE':
      return shapesArray[Math.floor(Math.random() * shapesArray.length)]
    case 'RESET_GAME':
      return shapesArray[Math.floor(Math.random() * shapesArray.length)]
    default:
      return state
  }
}

export const gameStarted = (state = false, action) => {
  switch (action.type) {
    case 'START_GAME':
      return action.payload
    case 'RESET_GAME':
      return true
    default:
      return state
  }
}

export const gameOver = (state = false, action) => {
  switch (action.type) {
    case 'SWITCH_GAME_OVER':
      return action.payload
    case 'RESET_GAME':
      return false
    default:
      return state
  }
}

export const score = (state = 0, action) => {
  switch (action.type) {
    case 'UPDATE_SCORE':
      return action.payload
    case 'RESET_GAME':
      return 0
    default:
      return state
  }
}
