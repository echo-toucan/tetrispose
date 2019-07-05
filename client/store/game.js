import {shapesArray} from '../AllShapes'
import {moveLeft, moveRight, rotate} from '../controls'

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

//ACTION TYPE!!

const SPAWN_SHAPE = 'SPAWN_SHAPE'
const UPDATE_BOARD = 'UPDATE_BOARD'
const UPDATE_SHAPE = 'UPDATE_SHAPE'
const UPDATE_SCORE = 'UPDATE_SCORE'
const SWITCH_GAME_ON = 'SWITCH_GAME_ON'
const START_GAME = 'START_GAME'
const SWITCH_GAME_OVER = 'SWITCH_GAME_OVER'
const RESET_GAME = 'RESET_GAME'
const MOVE_LEFT = 'MOVE_LEFT'
const MOVE_RIGHT = 'MOVE_RIGHT'
const ROTATE = 'ROTATE'
const CHANGE_PHASE = 'CHANGE_PHASE'

//ACTION CREATORS
export const newShape = () => ({
  type: SPAWN_SHAPE
})

export const updateSHAPE = shape => ({
  type: UPDATE_SHAPE,
  shape
})

export const updateBoard = board => ({
  type: UPDATE_BOARD,
  payload: board
})

export const updateScore = score => ({
  type: UPDATE_SCORE,
  payload: score
})

export const changeGameStatus = status => ({
  type: SWITCH_GAME_ON,
  payload: status
})

export const startGame = started => ({
  type: START_GAME,
  payload: started
})

export const changeGameOver = gameOver => ({
  type: SWITCH_GAME_OVER,
  payload: gameOver
})

export const resetGame = () => ({
  type: RESET_GAME
})

export const movedLeft = () => ({
  type: MOVE_LEFT
})

export const movedRight = () => ({
  type: MOVE_RIGHT
})

export const rotated = (rotations, counter) => ({
  type: ROTATE,
  rotations,
  counter
})

export const changePhase = () => ({
  type: CHANGE_PHASE
})

export const gameBoard = (state = Array.from(gameBoardArray), action) => {
  switch (action.type) {
    case UPDATE_BOARD:
      return action.payload
    case MOVE_LEFT:
      return moveLeft(state)
    case MOVE_RIGHT:
      return moveRight(state)
    case ROTATE:
      return rotate(state, action.rotations, action.counter)
    case RESET_GAME:
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

export const gameStarted = (state = false, action) => {
  switch (action.type) {
    case START_GAME:
      return action.payload
    case RESET_GAME:
      return true
    default:
      return state
  }
}

export const gameOver = (state = false, action) => {
  switch (action.type) {
    case SWITCH_GAME_OVER:
      return action.payload
    case RESET_GAME:
      return false
    default:
      return state
  }
}

export const score = (state = 0, action) => {
  switch (action.type) {
    case UPDATE_SCORE:
      return action.payload
    case RESET_GAME:
      return 0
    default:
      return state
  }
}

export const phase = (state = 1, action) => {
  switch (action.type) {
    case CHANGE_PHASE:
      if (state === 1) return 2
      else return 1
    default:
      return state
  }
}
