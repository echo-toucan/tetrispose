import shapesArray from '../AllShapes'

const CREATE_SHAPES = 'CREATE_SHAPES'
const UPDATE_SHAPES = 'UPDATE_SHAPES'

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
      //Creates three random shapes at the beginning of the game
      //Unavailble shapes (O, J, L, S, Z) are commented out in AllShapes.js and will NOT be selected
      let shapes = []
      for (let i = 0; i < 3; i++) {
        const newShape =
          shapesArray[Math.floor(Math.random() * shapesArray.length)]
        shapes.push(newShape)
      }
      return shapes
    }
    case UPDATE_SHAPES: {
      //Removes first element from the array adds a new one to the end
      const newShape =
        shapesArray[Math.floor(Math.random() * shapesArray.length)]
      return [...state.slice(1), newShape]
    }
    default:
      return state
  }
}
