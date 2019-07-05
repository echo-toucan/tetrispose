// ACTION TYPE

const GET_SHAPE = 'GET_SHAPE'
const SHAPE_ACHIEVED = 'SHAPE_ACHIEVED'
const GET_POSE = 'GET_POSE'

//ACTION CREATORS

export const getShape = () => ({
  type: GET_SHAPE
})

export const shapeAchieved = () => ({
  type: SHAPE_ACHIEVED
})

export const getPose = () => ({
  type: GET_POSE
})

//REDUCER
const initialState = {
  immediateShape: {
    name: 'I',
    shape: [[2], [2], [2], [2]],
    rotations: [[[2], [2], [2], [2]], [[2, 2, 2, 2]]],
    topLeft: {row: 0, col: 4}
  },
  achieved: false
}
export const posenetReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHAPE_ACHIEVED:
      console.log('shape achieved')
      return {...state, achieved: true}
    default:
      return state
  }
}
