import {moveLeft, moveRight, rotate, move} from './Utility/controls'
import cogoToast from 'cogo-toast'

const boardHeight = 20
const boardWidth = 10

const createBoard = (height, width) => {
  let board = []
  for (let i = 0; i < height; i++) {
    const row = new Array(width).fill(0)
    board.push(row)
  }
  return board
}

//ACTION TYPE!!

const SPAWN_SHAPE = 'SPAWN_SHAPE'
const UPDATE_BOARD = 'UPDATE_BOARD'
const UPDATE_SHAPE = 'UPDATE_SHAPE'
const UPDATE_SCORE = 'UPDATE_SCORE'
const RESET_GAME = 'RESET_GAME'
const MOVE_LEFT = 'MOVE_LEFT'
const MOVE_RIGHT = 'MOVE_RIGHT'
const MOVE = 'MOVE'
const ROTATE = 'ROTATE'
const CLEAR_ROWS = 'CLEAR_ROWS'
const CHANGE_PHASE = 'CHANGE_PHASE'
const GAME_LOADED = 'GAME_LOADED'
const LOAD_GAME = 'LOAD_GAME'
const SWITCH_GAME_ON = 'SWITCH_GAME_ON'
const START_GAME = 'START_GAME'
const GAME_OVER = 'GAME_OVER'
const SET_DROP_TIMER = 'SET_DROP_TIMER'
const SET_SPAWN_TIMER = 'SET_SPAWN_TIMER'
const PAUSE_GAME = 'PAUSE_GAME'

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

export const startGame = () => ({
  type: START_GAME
})

export const gameOver = () => ({
  type: GAME_OVER
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

export const moved = column => ({
  type: MOVE,
  payload: column
})

export const rotated = (rotations, target) => ({
  type: ROTATE,
  rotations,
  target
})

export const clearRows = rows => ({
  type: CLEAR_ROWS,
  payload: rows
})

export const changePhase = () => ({
  type: CHANGE_PHASE
})

export const gameLoaded = () => ({
  type: GAME_LOADED
})

export const loadGame = () => ({
  type: LOAD_GAME
})

export const setGridTimer = timeoutFn => ({
  type: SET_DROP_TIMER,
  payload: timeoutFn
})

export const setSpawnTimer = timeoutFn => ({
  type: SET_SPAWN_TIMER,
  payload: timeoutFn
})

export const pauseGame = () => ({
  type: PAUSE_GAME
})

const initialState = createBoard(boardHeight, boardWidth)

export const gameBoard = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BOARD:
      return action.payload
    case MOVE_LEFT:
      return moveLeft(state)
    case MOVE_RIGHT:
      return moveRight(state)
    case MOVE:
      return move(state, action.payload)
    case ROTATE:
      return rotate(state, action.rotations, action.target)
    case CLEAR_ROWS:
      const rowsToRemove = action.payload
      const clearedGrid = state.filter(
        (row, idx) => !action.payload.includes(idx)
      )
      for (let i = 0; i < rowsToRemove.length; i++) {
        const row = new Array(10).fill(0)
        clearedGrid.unshift(row)
      }
      return clearedGrid
    case RESET_GAME:
      return createBoard(boardHeight, boardWidth)
    default:
      return state
  }
}

export const gameState = (
  state = {started: false, loaded: false, paused: false},
  action
) => {
  switch (action.type) {
    case START_GAME:
      return {...state, started: true}
    case RESET_GAME:
      return {...state, started: false}
    case GAME_LOADED:
      return {...state, loaded: true}
    case LOAD_GAME:
      return {...state, loaded: false}
    case GAME_OVER:
      return {...state, started: false}
    case PAUSE_GAME:
      return {...state, paused: !state.paused}
    default:
      return state
  }
}

export const timers = (state = {drop: null, spawn: null}, action) => {
  switch (action.type) {
    case SET_DROP_TIMER:
      return {...state, drop: action.payload}
    case SET_SPAWN_TIMER:
      return {...state, spawn: action.payload}
    default:
      return state
  }
}

export const phase = (state = 1, action) => {
  switch (action.type) {
    case START_GAME:
      cogoToast.info('Game Starting now', {
        position: 'top-right'
      })
      return 1
    case CHANGE_PHASE:
      if (state === 1) return 2
      else return 1
    case RESET_GAME:
      cogoToast.info('Game Reset', {
        position: 'top-right'
      })
      return 0
    default:
      return state
  }
}

// export const gameOver = (state = false, action) => {
//   switch (action.type) {
//     case SWITCH_GAME_OVER:
//       return action.payload
//     case RESET_GAME:
//       return false
//     default:
//       return state
//   }
// }

// const SHAPE_ACHIEVED = 'SHAPE_ACHIEVED'
// const GOT_PENALTY = 'GOT_PENALTY'

export const gameScore = (state = 0, action) => {
  switch (action.type) {
    case UPDATE_SCORE:
      return action.payload + state
    case RESET_GAME:
      return 0
    // case SHAPE_ACHIEVED:
    //   return state + 10
    // case GOT_PENALTY:
    //   return state - 5
    default:
      return state
  }
}

const UPDATE_ROW_SCORE = 'UPDATE_ROW_SCORE'

export const updateRowCount = row => ({type: UPDATE_ROW_SCORE, payload: row})

export const rowScore = (state = 0, action) => {
  switch (action.type) {
    case UPDATE_ROW_SCORE:
      return action.payload + state
    case RESET_GAME:
      return 0
    default:
      return state
  }
}
