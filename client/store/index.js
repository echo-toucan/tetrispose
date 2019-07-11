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
  phase,
  timers,
  gameScore,
  rowScore
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
  gameScore,
  currentShape,
  previewShape,
  userShape,
  phase,
  timers,
  rowScore
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
