#Game Rules

1.  The game board will start out as empty.

2.  The user will be shown a current shape in the CurrentShape box.

* This shape will be the first element from the first item in the PreviewShape box.
* The PreviewShape box contains a queue of three randomly selected shapes from among available options. When a shape is passed to the current shape box, it will be removed from the PreviewShape box and a new random shape will appear at the end of the queue.

3.  The user required to match the current shape by making the appropriate pose with their body.

4.  After three seconds, the app will check if the shape has been matched.
    -If it has, the shape will spawn at the top of the game board.
    -If it has not, an X shape will be spawned into a random column on the board and will immediately fall to the bottom.
