import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import {
  newShape,
  gameBoard,
  updateBoard,
  updateScore,
  gameStarted,
  gameOver,
  score
} from './game'

import {currentShape, userShape, userMovement} from './currentShape'
import {previewShape} from './previewShape'

const reducer = combineReducers({
  user,
  newShape,
  gameBoard,
  updateBoard,
  updateScore,
  gameStarted,
  gameOver,
  score,
  currentShape,
  previewShape,
  userShape,
  userMovement
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
