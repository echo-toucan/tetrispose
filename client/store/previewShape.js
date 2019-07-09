import {getRandom} from '../AllShapes'

const CREATE_SHAPES = 'CREATE_SHAPES'
const UPDATE_SHAPES = 'UPDATE_SHAPES'
const RESET_GAME = 'RESET_GAME'

export const createShapes = () => ({
  type: CREATE_SHAPES
})

export const updateShapes = () => ({
  type: UPDATE_SHAPES
})

const initialState = []

export const previewShape = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SHAPES: {
      const shapes = [getRandom()]
      return shapes
    }
    case UPDATE_SHAPES: {
      //Removes first element from the array adds a new one to the end
      const newShape = getRandom()
      return [...state.slice(1), newShape]
    }
    case RESET_GAME:
      return [getRandom()]
    default:
      return state
  }
}
