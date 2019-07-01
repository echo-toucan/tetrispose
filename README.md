#Game Rules

1.  The game board will start out as empty.

2.  The user will be shown a current shape in the CurrentShape box.

* This shape will be the first element from the PreviewShape box.
* The PreviewShape box contains a queue of three randomly selected shapes from among available options. When a shape is passed to the current shape box, it will be removed from the PreviewShape box and a new random shape will appear at the end of the queue.

3.  The user required to match the current shape by making the appropriate pose with their body.

4.  After three seconds, the app will check if the shape has been matched.
    -If it has, the shape will spawn at the top of the game board.
    -If it has not, an X shape will be spawned into a random column on the board and will immediately fall to the bottom.

5.  After the shape spawns, it will begin to fall toward the bottom of the board. Through gestures or movement, the user will be able to manipulate the shape's position (rotation and left-right movement) as it falls.

6.  After the shape lands on another shape or the bottom of the board, it will freeze in place and can no longer be manipulated.

7.  When the shape lands, a new shape will appear (step 2 above)

8.  If a row is completed from left to right, the row will disappear and all blocks above that row will fall one level.

9.  The game ends when:
    -a shape spawns in the same position as an occupied cell (in the top 2 rows of the grid). The user LOSES.
    -a set number of shapes (50?) have spawned and landed without the user losing. The user WINS
