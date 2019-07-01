export const shapesArray = [
  // {
  //   name: 'O',
  //   shape: [[1, 1], [1, 1]],
  //   rotations: [[[1, 1], [1, 1]]],
  //   topLeft: {row: 0, col: 4}
  // },
  {
    name: 'I',
    shape: [[2, 2, 2, 2]],
    rotations: [[[2, 2, 2, 2]], [[2], [2], [2], [2]]],
    topLeft: {row: 0, col: 4}
  },
  // {
  //   name: 'Z',
  //   shape: [[3, 3, 0], [0, 3, 3]],
  //   rotations: [[[3, 3, 0], [0, 3, 3]], [[0, 3], [3, 3], [3, 0]]],
  //   topLeft: {row: 0, col: 4}
  // },
  // {
  //   name: 'S',
  //   shape: [[0, 4, 4], [4, 4, 0]],
  //   rotations: [[[0, 4, 4], [4, 4, 0]], [[4, 0], [4, 4], [0, 4]]],
  //   topLeft: {row: 0, col: 4}
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
    topLeft: {row: 0, col: 4}
  }
  // ,
  // {
  //   name: 'L',
  //   shape: [[0, 6, 0], [0, 6, 0], [0, 6, 6]],
  //   rotations: [
  //     [[0, 6, 0], [0, 6, 0], [0, 6, 6]],
  //     [[6, 6, 6], [6, 0, 0]],
  //     [[6, 6], [0, 6], [0, 6]],
  //     [[0, 0, 6], [6, 6, 6]]
  //   ],
  //   topLeft: {row: 0, col: 3}
  // },
  // {
  //   name: 'J',
  //   shape: [[0, 7, 0], [0, 7, 0], [7, 7, 0]],
  //   rotations: [
  //     [[0, 7, 0], [0, 7, 0], [7, 7, 0]],
  //     [[7, 0, 0], [7, 7, 7]],
  //     [[7, 7], [7, 0], [7, 0]],
  //     [[7, 7, 7], [0, 0, 7]]
  //   ],
  //   topLeft: {row: 0, col: 4}
  // }
]

export const getRandom = () =>
  shapesArray[Math.floor(Math.random() * shapesArray.length)]
