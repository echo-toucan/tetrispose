export const shapesArray = [
  // {
  //   name: 'O',
  //   shape: [[1, 1], [1, 1]],
  //   rotations: [[[1, 1], [1, 1]]],
  //   topLeft: {row: 0, col: 4},
  //   color: 'yellow'
  // },
  {
    name: 'I',
    shape: [[2, 2, 2, 2]],
    rotations: [[[2, 2, 2, 2]], [[2], [2], [2], [2]]],
    topLeft: {row: 0, col: 4},
    color: 'cyan'
  },
  // {
  //   name: 'Z',
  //   shape: [[3, 3, 0], [0, 3, 3]],
  //   rotations: [[[3, 3, 0], [0, 3, 3]], [[0, 3], [3, 3], [3, 0]]],
  //   topLeft: {row: 0, col: 4},
  //   color: 'red'
  // },
  // {
  //   name: 'S',
  //   shape: [[0, 4, 4], [4, 4, 0]],
  //   rotations: [[[0, 4, 4], [4, 4, 0]], [[4, 0], [4, 4], [0, 4]]],
  //   topLeft: {row: 0, col: 4},
  //   color: 'limegreen'
  // },
  {
    name: 'T',
    shape: [[5, 5, 5], [0, 5, 0]],
    rotations: [
      [[5, 5, 5], [0, 5, 0]],
      [[0, 5], [5, 5], [0, 5]],
      [[0, 5, 0], [5, 5, 5]],
      [[5, 0], [5, 5], [5, 0]]
    ],
    topLeft: {row: 0, col: 4},
    color: 'purple'
  },
  {
    name: 'L',
    shape: [[0, 6, 0], [0, 6, 0], [0, 6, 6]],
    rotations: [
      [[0, 6, 0], [0, 6, 0], [0, 6, 6]],
      [[6, 6, 6], [6, 0, 0]],
      [[6, 6], [0, 6], [0, 6]],
      [[0, 0, 6], [6, 6, 6]]
    ],
    topLeft: {row: 0, col: 3},
    color: 'orange'
  },
  {
    name: 'J',
    shape: [[0, 7, 0], [0, 7, 0], [7, 7, 0]],
    rotations: [
      [[0, 7, 0], [0, 7, 0], [7, 7, 0]],
      [[7, 0, 0], [7, 7, 7]],
      [[7, 7], [7, 0], [7, 0]],
      [[7, 7, 7], [0, 0, 7]]
    ],
    topLeft: {row: 0, col: 4},
    color: 'blue'
  }
]

export const getRandom = () =>
  shapesArray[Math.floor(Math.random() * shapesArray.length)]

export const penalty = {
  name: 'X',
  shape: [[8, 0, 8], [0, 8, 0], [8, 0, 8]],
  rotations: [[[8, 0, 8], [0, 8, 0], [8, 0, 8]]],
  topLeft: {row: 0, col: 4},
  color: 'white'
}

export const colors = [
  'black',
  'yellow',
  'cyan',
  'red',
  'limegreen',
  'purple',
  'orange',
  'blue',
  'white'
]
