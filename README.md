# Welcome to Tetris Pose

[![Build Status](https://travis-ci.org/echo-toucan/capstone.svg?branch=master)](https://travis-ci.org/echo-toucan/capstone)

Team Members:

Amneet Sandhu : https://github.com/amneet954
Hari Doshi : https://github.com/hdoshi2
Sunny Chang : https://github.com/SunnyChangMei
Terence Helsel: https://github.com/tjhelsel

Deployed Site: https://tetris-pose.herokuapp.com/

Tetris Pose is a new twist on the classic game. Powered by React, Redux and Google’s TensorFlow technology, Tetris pose lets you use body gesture to control the game!

Game Rules:

• The user will be shown a current shape in the Current Shape box.

* This shape will be the first element from the Preview Shape box.
* Preview Shape contains a randomly selected shape. When shape is passed to the current shape box, it will be removed and a new random shape will appear.

• The user matches the current shape by making the appropriate pose with body gestures.

• After three seconds, the game will check if the shape has been matched.

* If successfully matched, the shape will spawn at the top of the game board
* If not, a penalty will be issued.

• As the created shape populates, the user will be able to manipulate the shape's position (rotation and left-right movement) as it falls.

• When the shape lands on another shape or at the bottom of the board, it will freeze in place and can no longer be manipulated.

• If a row is completed from left to right, the row will disappear and all blocks above that row will fall one level.

• The game ends when the new shape cannot populate on the grid.
