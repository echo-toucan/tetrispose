import {createStore, combineReducers, applyMiddleware} from 'redux'
// import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import {
  newShape,
  gameBoard,
  updateBoard,
  updateScore,
  gameState,
  // gameOver,
  gameScore,
  updateRowCount,
  phase
} from './game'

import {currentShape, userShape} from './currentShape'
import {previewShape} from './previewShape'

const reducer = combineReducers({
  user,
  newShape,
  gameBoard,
  updateBoard,
  updateScore,
  gameState,
  // gameOver,
  gameScore,
  currentShape,
  previewShape,
  userShape,
  phase,
  updateRowCount
})
const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware
    // , createLogger({collapsed: true})
  )
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './game'
export * from './currentShape'
export * from './previewShape'
