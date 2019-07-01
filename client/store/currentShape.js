// ACTION TYPE

const UPDATE_CURRENT = 'UPDATE_CURRENT'
const SHAPE_ACHIEVED = 'SHAPE_ACHIEVED'
const GET_ACHIEVED = 'GET_ACHIEVED'
const SET_USER_SHAPE = 'SET_USER_SHAPE'
const GET_USER_SHAPE = 'GET_USER_SHAPE'
//ACTION CREATORS

export const updateCurrent = shape => ({
  type: UPDATE_CURRENT,
  payload: shape
})

export const shapeAchieved = () => ({
  type: SHAPE_ACHIEVED
})

export const setUserShape = shape => ({
  type: SET_USER_SHAPE,
  payload: shape
})

export const getUserShape = () => ({
  type: GET_USER_SHAPE
})

//REDUCER
const initialState = {
  shape: {},
  achieved: false
}

export const currentShape = (state = initialState, action) => {
  switch (action.type) {
    case SHAPE_ACHIEVED:
      console.log('shape achieved')
      return {...state, achieved: true}
    case UPDATE_CURRENT:
      return {shape: action.shape, achieved: false}
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
