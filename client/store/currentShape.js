// ACTION TYPE

const UPDATE_CURRENT = 'UPDATE_CURRENT'
const SHAPE_ACHIEVED = 'SHAPE_ACHIEVED'
const GET_ACHIEVED = 'GET_ACHIEVED'

//ACTION CREATORS

export const updateCurrent = shape => ({
  type: UPDATE_CURRENT,
  payload: shape
})

export const shapeAchieved = () => ({
  type: SHAPE_ACHIEVED
})

//REDUCER
const initialState = {
  // shape: {},
  shape: {
    name: 'I',
    shape: [[2, 2, 2, 2]],
    rotations: [[[2, 2, 2, 2]], [[2], [2], [2], [2]]],
    topLeft: {row: 0, col: 4}
  },
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
