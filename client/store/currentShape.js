import {getRandom, penalty} from '../AllShapes'

// ACTION TYPE

const UPDATE_CURRENT = 'UPDATE_CURRENT'
const SHAPE_ACHIEVED = 'SHAPE_ACHIEVED'
const GOT_PENALTY = 'GOT_PENALTY'
const SET_FIRST_SHAPE = 'SET_FIRST_SHAPE'
const SET_USER_SHAPE = 'SET_USER_SHAPE'
const GET_USER_SHAPE = 'GET_USER_SHAPE'
const MOVE_LEFT = 'MOVE_LEFT'
const MOVE_RIGHT = 'MOVE_RIGHT'
const SET_USER_MOVEMENT = 'SET_USER_MOVEMENT'

//ACTION CREATORS

export const updateCurrent = shape => ({
  type: UPDATE_CURRENT,
  payload: shape
})

export const shapeAchieved = () => ({
  type: SHAPE_ACHIEVED
})

export const gotPenalty = () => ({
  type: GOT_PENALTY
})

export const setFirstShape = () => ({
  type: SET_FIRST_SHAPE
})

export const setUserShape = shape => ({
  type: SET_USER_SHAPE,
  payload: shape
})

export const getUserShape = () => ({
  type: GET_USER_SHAPE
})

export const moveLeft = pose => ({
  type: MOVE_LEFT,
  payload: pose
})

export const moveRight = pose => ({
  type: MOVE_RIGHT,
  payload: pose
})

export const setUserMovement = pose => ({
  type: SET_USER_MOVEMENT,
  payload: pose
})

//REDUCER

const initialState = {
  shape: {},
  achieved: false
}

export const currentShape = (state = initialState, action) => {
  switch (action.type) {
    case SET_FIRST_SHAPE:
      return {...state, shape: getRandom()}
    case SHAPE_ACHIEVED:
      return {...state, achieved: true}
    case GOT_PENALTY:
      return {shape: penalty, achieved: false}
    case UPDATE_CURRENT:
      return {shape: action.payload, achieved: false}
    default:
      return state
  }
}

const initialUserShape = ''
export const userShape = (state = initialUserShape, action) => {
  switch (action.type) {
    case SET_USER_SHAPE:
      if (action.payload) {
        return action.payload
      } else {
        return null
      }
    case GET_USER_SHAPE:
      return state
    default:
      return state
  }
}

export const userMovement = (state = {}, action) => {
  switch (action.type) {
    case SET_USER_MOVEMENT:
      if (action.payload) {
        return action.payload
      } else {
        return null
      }
    case MOVE_LEFT:
      return action.payload
    case MOVE_RIGHT:
      return action.payload
    default:
      return state
  }
}
